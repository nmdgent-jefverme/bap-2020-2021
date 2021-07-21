<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use App\Models\Users_in_project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends BaseController
{
    public function index() {
        try {
            return response(Project::with('piles.color')->with('piles.ideas.idea_type')->with('author')->get());
        } catch (\Throwable $th) {
            return $this->sendError('Error retreiving projects', $th);
        }
    }

    public function byId(Project $project) {
        try {
            return $this->sendResponse(Project::with('piles.color')->with('piles.ideas.idea_type')->with('author')->with('piles.ideas.author')->get()->find($project), 'Project with id: ' . $project->id . ' received succesfully');
        } catch (\Throwable $th) {
            return $this->sendError('Error retreiving projects', $th);
        }
    }

    public function byUserId(User $user) {
        try {
            return $this->sendResponse(Users_in_project::with('user')->with('project')->get()->where('user_id', $user->id)->groupBy('project_id'), 'Project from user: ' . $user->name . ' received succesfully');
        } catch (\Throwable $th) {
            return $this->sendError('Error retreiving projects', $th);
        }
    }

    public function createProject(Request $r) {
        $validator = Validator::make($r->all(), [
            'title' => 'required',
            'user_id' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }
        $project = new Project([
            'title' => $r->title,
            'author_id' => $r->user_id
        ]);
        $project->save();
        $usersInProject = new Users_in_project([
            'user_id' => $r->user_id,
            'project_id' => $project->id,
            'role' => 1
        ]);
        $usersInProject->timestamps = false;
        $usersInProject->save();
        return $this->sendResponse($project, 'Project created successfully');
    }

    public function updateProject ( Project $project, Request $r) {
        $validator = Validator::make($r->all(), [
            'title' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }
        $project->title = $r->title;
        $project->save();
        return $this->sendResponse($project, 'Project updated successfully');
    }

    public function delete ( Project $project ) {
        $project->delete();
        Users_in_project::where([
            ['project_id', $project->id],
            ['user_id', $project->author_id],
        ])->delete();
        return $this->sendResponse([], 'Project deleted successfully');
    }

    public function invite (Project $project, Request $r) {
        $validator = Validator::make($r->all(), [
            'email' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }
        $user = User::where('email', $r->email)->first();
        if($user === null) {
            return $this->sendError('user not found', 404, 404);
        }
        $check = Users_in_project::where([
            'project_id' => $project->id,
            'user_id' => $user->id,
        ])->exists();
        if($check) {
            return $this->sendError('user already in project', 404, 404);
        }
        $invite = new Users_in_project([
            'project_id' => $project->id,
            'user_id' => $user->id,
            'role' => (int)$r->role
        ]);
        $invite->save();
        return $this->sendResponse($invite, 'Inviting to project');
    }

    public function canEditProject (Project $project, Request $r) {
        $check = Users_in_project::where([
            'project_id' => $project->id,
            'user_id' => (int)$_GET['user_id'],
        ])->first();
        return $this->sendResponse($check->role, 'Check user role');
    }
}

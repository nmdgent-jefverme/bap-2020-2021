<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use App\Mail\InivitedToProject;
use App\Models\Users_in_project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
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
            return $this->sendResponse(Project::with('piles.color')->with('piles.ideas.file')->with('author')->with('piles.ideas.author')->with('piles.ideas.author.picture')->get()->find($project), 'Project with id: ' . $project->id . ' received succesfully');
        } catch (\Throwable $th) {
            return $this->sendError('Error retreiving projects', $th);
        }
    }

    public function byUserId(User $user) {
        try {
            return $this->sendResponse(Users_in_project::with('user')->with('project')->with('project.author')->get()->where('user_id', $user->id)->groupBy('project_id'), 'Project from user: ' . $user->name . ' received succesfully');
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
        Mail::to($user->email)->send(new InivitedToProject([
            'name' => $user->name,
            'projectName' => $project->title,
            'projectUrl' => env('CLIENT_URL') . 'projects/' . $project->id
        ]));
        $invite->save();
        return $this->sendResponse($invite, 'Inviting to project');
    }

    public function canEditProject (Project $project, Request $r) {
        $check = Users_in_project::where([
            'project_id' => $project->id,
            'user_id' => (int)$_GET['user_id'],
        ])->first();
        if($check !== null) {
            return $this->sendResponse($check->role, 'Check user role');
        } else {
            return $this->sendError('User not in project', 404, 404);
        }
    }

    public function getUsersInProject (Project $project) {
        $users = Users_in_project::where('project_id', $project->id)->with('user')->get();
        return $this->sendResponse($users, 'users found');
    }

    public function removeUserFromProject (Project $project, Request $r) {
        Users_in_project::where([
            ['project_id', $project->id],
            ['user_id', $r->user_id],
        ])->delete();
        return $this->sendResponse([$r->user_id], 'user deleted from project');
    }

    public function updateUserRole (Request $r) {

        // $user = Users_in_project::where('project_id', (int)$r->project_id)->where('user_id', (int)$r->user_id)->first();

        // $user->role = (int)$r->new_role;
        // $user->save();

        $user = DB::table('users_in_projects')
                ->where('project_id', (int)$r->project_id)
                ->where('user_id', (int)$r->user_id)
                ->update(['role' => (int)$r->new_role]);
        return $this->sendResponse($user, 'User role updated');
    }
}

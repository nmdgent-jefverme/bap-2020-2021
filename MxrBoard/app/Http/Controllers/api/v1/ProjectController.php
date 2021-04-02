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
            return response(Project::with('piles.color')->with('piles.ideas.idea_type')->get());
        } catch (\Throwable $th) {
            return $this->sendError('Error retreiving projects', $th);
        }
    }

    public function byId(Project $project) {
        try {
            return $this->sendResponse(Project::with('piles.color')->with('piles.ideas.idea_type')->get()->find($project), 'Project with id: ' . $project->id . ' received succesfully');
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
            'title' => $r->title
        ]);
        $project->save();
        $usersInProject = new Users_in_project([
            'user_id' => $r->user_id,
            'project_id' => $project->id
        ]);
        $usersInProject->timestamps = false;
        $usersInProject->save();
        return $this->sendResponse($project, 'Project created successfully');
    }
}

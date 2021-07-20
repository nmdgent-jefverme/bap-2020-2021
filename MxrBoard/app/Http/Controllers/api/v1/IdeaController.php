<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Pile;
use App\Models\Project;
use App\Models\Project_idea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IdeaController extends BaseController
{

    public function addIdea( Request $r ) {
        $validator = Validator::make($r->all(), [
            'link' => 'required',
            'pile_id' => 'required|exists:App\Models\Pile,id',
            'title' => 'required',
            'author_id' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }
        $newIdea = new Project_idea([
            'pile_id' => $r->pile_id,
            'link' => $r->link,
            'title' => $r->title,
            'author_id' => $r->author_id
        ]);
        $newIdea->save();
        return $this->sendResponse($newIdea, 'Idea created successfully.');
    }

    public function updateIdea( $id, Request $r ) {
        $validator = Validator::make($r->all(), [
            'link' => 'required',
            'title' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }
        $idea = Project_idea::find($id);
        $pile = Pile::find($idea->pile_id);
        $pile->touch();
        $project = Project::find($pile->project_id);
        $project->touch();
        $idea->title = $r->title;
        $idea->link = $r->link;
        $idea->save();
        return $this->sendResponse($idea, 'Idea updated successfully.');
    }

    public function remove ($id) {
        Project_idea::find($id)->delete();
        return $this->sendResponse($id, 'Idea removed successfully');
    }
}

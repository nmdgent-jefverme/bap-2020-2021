<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Project_idea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IdeaController extends BaseController
{

    public function addIdea( Project $project, Request $r ) {
        $validator = Validator::make($r->all(), [
            'idea_type_id' => 'required|exists:App\Models\Idea_type,id',
            'title' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }
        $newIdea = new Project_idea([
            'project_id' => $project->id,
            'idea_type_id' => $r->idea_type_id,
            'title' => $r->title,
            'filePath' => 'lorem ipsum',
            'text' => 'lorem ipsum',
        ]);
        $newIdea->save();
        return $newIdea;
    }
}

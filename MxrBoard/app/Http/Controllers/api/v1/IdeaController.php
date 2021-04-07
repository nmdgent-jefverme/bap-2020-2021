<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
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
            'title' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }
        $newIdea = new Project_idea([
            'pile_id' => $r->pile_id,
            'link' => $r->link,
            'title' => $r->title
        ]);
        $newIdea->save();
        return $this->sendResponse($newIdea, 'Idea created successfully.');
    }

    public function remove ($id) {
        Project_idea::find($id)->delete();
        return $this->sendResponse($id, 'Idea removed successfully');
    }
}

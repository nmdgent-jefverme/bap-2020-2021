<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Pile;
use App\Models\Project;
use App\Models\Project_idea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PileController extends BaseController
{
    public function byId (Pile $pile) {
        return $this->sendResponse(['pile' => Pile::where('id', $pile->id)->with('color')->first(), 'ideas' => Project_idea::where('pile_id', $pile->id)->with('author')->get()], 'Pile fetched succesfully');
    }
    public function addPile ( Request $r ) {
        $validator = Validator::make($r->all(), [
            'name' => 'required',
            'color_id' => 'required|exists:App\Models\Color,id',
            'project_id' => 'required|exists:App\Models\Project,id',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }

        $pile = new Pile([
            'project_id' => $r->project_id,
            'color_id' => $r->color_id,
            'name' => $r->name
        ]);
        $pile->save();

        Project::find($r->project_id)->touch();

        return $this->sendResponse($pile, 'Pile created succesfully');
    }
    public function update( Pile $pile, Request $r ) {
        $validator = Validator::make($r->all(), [
            'name' => 'required',
            'color_id' => 'required|exists:App\Models\Color,id',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }

        $pile->name = $r->name;
        $pile->color_id = $r->color_id;
        $pile->save();

        Project::find($pile->project_id)->touch();

        return $this->sendResponse($pile, 'Pile updated successfully');
    }

    public function delete ( Pile $pile ) {
        Project_idea::where('pile_id', $pile->id)->forceDelete();
        $pile->delete();
        return $this->sendResponse([], 'Pile deleted successfully.');
    }
}

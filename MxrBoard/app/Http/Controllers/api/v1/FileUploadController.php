<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class FileUploadController extends BaseController {
    public function upload(Request $request)
    {
        $validator = Validator::make($request->all(),[
              'file' => 'required',
        ]);

        if($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 400);
         }


        if ($file = $request->file('file')) {
            $path = $file->store('public/files');
            $name = $file->getClientOriginalName();

            //store your file into directory and db
            $save = new File();
            $save->name = $file;
            $save->path= $path;
            $save->save();

            return $this->sendResponse($save, 'File uploaded');
        }


    }
}

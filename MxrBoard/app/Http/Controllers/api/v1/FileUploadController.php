<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileUploadController extends BaseController {
    public function getFile(File $file) {
        if($file) {
            $contents = Storage::get('profilepictures/' . $file->name);
            dd(mb_convert_encoding($contents, "UTF-8", "auto"));
            return $this->sendResponse($contents, 'File retreived');
        }
    }
    public function upload(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'file'  => 'required|mimes:png,jpg,jpeg,gif|max:2305',
        ]);

        if($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 400);
         }

         if ($file = $request->file('file')) {
            $path = $file->store('public/files');

            //store your file into directory and db
            $save = new File();
            $save->name = $file->hashName();
            $save->path= $path;
            $save->save();

            return $this->sendResponse($save, 'File uploaded');
        }
    }
}

<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\api\v1\BaseController as BaseController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends BaseController
{
    public function editUser ( User $user, Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'instruments' => 'required',
            'email' => 'required|email|unique:users,email,'.$user->id,
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }
        $user->name = $request->name;
        $user->email = $request->email;
        $user->instruments = $request->instruments;
        $user->save();

        $success['token'] =  $user->createToken('apiToken')-> accessToken;
        $success['id'] =  $user->id;
        $success['name'] =  $user->name;
        $success['email'] =  $user->email;
        $success['instruments'] =  $user->instruments;

        return $this->sendResponse($success, 'User updated successfully.');
    }

    public function editUserPicture ( User $user, Request $request) {
        $validator = Validator::make($request->all(), [
            'fileId' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }
        $user->profile_picture = $request->fileId;
        $user->save();

        $success['token'] =  $user->createToken('apiToken')-> accessToken;
        $success['id'] =  $user->id;
        $success['name'] =  $user->name;
        $success['email'] =  $user->email;
        $success['instruments'] =  $user->instruments;
        $success['profile_picture'] =  $user->profile_picture;

        return $this->sendResponse($success, 'User updated successfully.');
    }
}

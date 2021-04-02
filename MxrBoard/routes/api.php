<?php

use App\Http\Controllers\api\v1\BandController;
use App\Http\Controllers\api\v1\FileUploadController;
use App\Http\Controllers\api\v1\IdeaController;
use App\Http\Controllers\api\v1\IdeaTypeController;
use App\Http\Controllers\api\v1\LoginController;
use App\Http\Controllers\api\v1\ProjectController;
use App\Http\Controllers\api\v1\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->group( function () {
    Route::get('/bands', [BandController::class, 'index']);
    Route::prefix('/user')->group( function () {
        Route::post('/edit/{user}', [UserController::class, 'editUser']);
        Route::get('/projects/{user}', [ ProjectController::class, 'byUserId' ]);
    });

    Route::get('/projects', [ ProjectController::class, 'index' ]);
    Route::post('/projects', [ ProjectController::class, 'createProject' ]);
    Route::get('/projects/{project}', [ ProjectController::class, 'byId' ]);

    Route::get('/idea_types', [ IdeaTypeController::class, 'index' ]);

    Route::post('/projects/{project}/add_idea', [ IdeaController::class, 'addIdea' ]);

    //fileupload
    Route::post('/file_upload', [FileUploadController::class, 'upload']);
});



//User routes
Route::prefix('/user')->group( function () {
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/register', [LoginController::class, 'register']);
});

// Fallback route 404
Route::fallback(function () {
    return response()->json(['error' => 'Not Found!'], 404);
});

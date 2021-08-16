<?php

use App\Http\Controllers\api\v1\BandController;
use App\Http\Controllers\api\v1\ColorsController;
use App\Http\Controllers\api\v1\FileUploadController;
use App\Http\Controllers\api\v1\IdeaController;
use App\Http\Controllers\api\v1\IdeaTypeController;
use App\Http\Controllers\api\v1\LoginController;
use App\Http\Controllers\api\v1\PileController;
use App\Http\Controllers\api\v1\ProjectController;
use App\Http\Controllers\api\v1\UserController;
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
        Route::post('/edit_picture/{user}', [UserController::class, 'editUserPicture']);
        Route::get('/projects/{user}', [ ProjectController::class, 'byUserId' ]);
    });

    /**
     * Project routes
     */
    Route::get('/projects', [ ProjectController::class, 'index' ]);
    Route::post('/projects', [ ProjectController::class, 'createProject' ]);
    Route::get('/projects/{project}', [ ProjectController::class, 'byId' ]);
    Route::delete('/projects/{project}', [ ProjectController::class, 'deleteProject' ]);
    Route::post('/projects/{project}', [ ProjectController::class, 'updateProject' ]);
    Route::post('/projects/{project}/invite', [ ProjectController::class, 'invite' ]);
    Route::delete('projects/{project}', [ ProjectController::class, 'delete' ]);
    Route::get('/project/users/{project}', [ ProjectController::class, 'getUsersInProject' ]);
    Route::delete('/project/users/{project}', [ ProjectController::class, 'removeUserFromProject' ]);
    Route::post('/project/users', [ ProjectController::class, 'updateUserRole' ]);

    Route::get('/idea_types', [ IdeaTypeController::class, 'index' ]);
    Route::get('/colors', [ ColorsController::class, 'index' ]);
    Route::post('/colors', [ ColorsController::class, 'addColor' ]);
    Route::get('/projects/{project}/can_edit', [ ProjectController::class, 'canEditProject' ]);

    /**
     * Pile routes
     */
    Route::post('/pile/{pile}', [ PileController::class, 'update' ]);
    Route::post('/piles/add_pile', [ PileController::class, 'addPile' ]);
    Route::delete('/pile/{pile}', [ PileController::class, 'delete' ]);
    Route::get('/pile/{pile}', [ PileController::class, 'byId' ]);

    Route::post('/projects/{project}/add_idea', [ IdeaController::class, 'addIdea' ]);

    Route::delete('/idea/{id}', [IdeaController::class, 'remove'] );
    Route::post('/idea/{id}', [IdeaController::class, 'updateIdea'] );

    //fileupload
    Route::post('/file_upload', [FileUploadController::class, 'upload']);
    Route::get('/file/{file}', [FileUploadController::class, 'getFile']);

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

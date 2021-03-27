<?php

use App\Http\Controllers\api\v1\BandController;
use App\Http\Controllers\api\v1\LoginController;
use App\Http\Controllers\api\v1\UserController;
use App\Models\Band;
use App\Models\Project;
use App\Models\Project_idea;
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
    });
});

Route::get('/projects/{project}', function ( Project $project ) {
    // return $id;
    return $project->with('project_ideas')->get();
});


//User routes
Route::prefix('/user')->group( function () {
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/register', [LoginController::class, 'register']);
});

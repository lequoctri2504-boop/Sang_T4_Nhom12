<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Letter;
use Illuminate\Routing\Controller as RoutingController;

class LetterController extends RoutingController
{
    public function index()
    {
        $letters = Letter::orderBy('sort_order')->get()->map(function ($letter) {
            return [
                'id'            => $letter->id,
                'name'          => $letter->name,
                'example_word'  => $letter->example_word,
                'sort_order'    => $letter->sort_order,
                'image_url'     => $letter->image
                                    ? asset('storage/' . $letter->image)
                                    : null,
                'audio_url'     => $letter->audio
                                    ? asset('storage/' . $letter->audio)
                                    : null,
                'example_image_url' => $letter->example_image
                                    ? asset('storage/' . $letter->example_image)
                                    : null,
            ];
        });

        return response()->json(['success' => true, 'data' => $letters]);
    }

    public function show($id)
    {
        $letter = Letter::findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => [
                'id'                => $letter->id,
                'name'              => $letter->name,
                'example_word'      => $letter->example_word,
                'sort_order'        => $letter->sort_order,
                'image_url'         => $letter->image ? asset('storage/' . $letter->image) : null,
                'audio_url'         => $letter->audio ? asset('storage/' . $letter->audio) : null,
                'example_image_url' => $letter->example_image ? asset('storage/' . $letter->example_image) : null,
            ]
        ]);
    }
}
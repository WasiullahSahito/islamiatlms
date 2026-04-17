<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\Lecture;
use App\Models\Test;
use Illuminate\Http\Request;

class InstructorController extends Controller
{
    // Authorization Check Helper
    private function checkInstructor($user)
    {
        if (!$user->isInstructor()) {
            abort(403, 'Unauthorized. Instructor access only.');
        }
    }

    // --- MATERIALS ---
    public function getMaterials()
    {
        return response()->json(Material::orderBy('created_at', 'desc')->get());
    }

    public function storeMaterial(Request $request)
    {
        $this->checkInstructor($request->user());

        $request->validate([
            'title' => 'required|string',
            'course_id' => 'required|string',
            'type' => 'required|string',
            'file' => 'required|file|max:10240' // Max 10MB
        ]);

        $path = $request->file('file')->store('course_materials', 'public');

        $material = Material::create([
            'title' => $request->title,
            'course_id' => $request->course_id,
            'type' => $request->type,
            'file_path' => $path
        ]);

        return response()->json(['message' => 'Material uploaded', 'material' => $material], 201);
    }

    public function deleteMaterial(Request $request, $id)
    {
        $this->checkInstructor($request->user());
        Material::findOrFail($id)->delete();
        return response()->json(['message' => 'Material deleted']);
    }

    // --- LECTURES ---
    public function getLectures()
    {
        return response()->json(Lecture::orderBy('created_at', 'desc')->get());
    }

    public function storeLecture(Request $request)
    {
        $this->checkInstructor($request->user());

        $request->validate([
            'title' => 'required|string',
            'course_id' => 'required|string',
            'link' => 'required|url'
        ]);

        $lecture = Lecture::create($request->all());
        return response()->json(['message' => 'Lecture added', 'lecture' => $lecture], 201);
    }

    public function deleteLecture(Request $request, $id)
    {
        $this->checkInstructor($request->user());
        Lecture::findOrFail($id)->delete();
        return response()->json(['message' => 'Lecture deleted']);
    }

    // --- TESTS & QUESTIONS ---
    public function getTests()
    {
        return response()->json(Test::with('questions')->orderBy('created_at', 'desc')->get());
    }

    public function storeTest(Request $request)
    {
        $this->checkInstructor($request->user());

        $request->validate([
            'title' => 'required|string',
            'course_id' => 'required|string',
            'available_from' => 'required|date'
        ]);

        $test = Test::create($request->only(['title', 'course_id', 'available_from']));

        // If questions are provided during test creation
        if ($request->has('questions') && is_array($request->questions)) {
            foreach ($request->questions as $q) {
                $test->questions()->create([
                    'q_text' => $q['qText'],
                    'options' => $q['options'],
                    'correct_option' => $q['correctOption']
                ]);
            }
        }

        return response()->json(['message' => 'Test created', 'test' => $test->load('questions')], 201);
    }

    public function updateTestQuestions(Request $request, $id)
    {
        $this->checkInstructor($request->user());

        $test = Test::findOrFail($id);

        $request->validate([
            'questions' => 'required|array',
            'questions.*.qText' => 'required|string',
            'questions.*.options' => 'required|array|min:4|max:4',
            'questions.*.correctOption' => 'required|integer|min:0|max:3'
        ]);

        // Clear old questions and insert new (syncing logic)
        $test->questions()->delete();

        foreach ($request->questions as $q) {
            $test->questions()->create([
                'q_text' => $q['qText'],
                'options' => $q['options'],
                'correct_option' => $q['correctOption']
            ]);
        }

        return response()->json(['message' => 'Questions updated', 'test' => $test->load('questions')]);
    }

    public function deleteTest(Request $request, $id)
    {
        $this->checkInstructor($request->user());
        Test::findOrFail($id)->delete(); // Cascades questions automatically based on DB constraints
        return response()->json(['message' => 'Test deleted']);
    }
}

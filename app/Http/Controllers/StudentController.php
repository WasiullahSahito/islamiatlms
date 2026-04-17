<?php

namespace App\Http\Controllers;

use App\Models\Test;
use App\Models\TestScore;
use App\Models\Material;
use App\Models\Lecture;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function getDashboardData(Request $request)
    {
        $user = $request->user();

        // Get courses the student has paid for and have been approved
        $enrolledCourseIds = $user->enrollments()
            ->where('payment_status', 'completed')
            ->pluck('course_id');

        // Fetch resources matching those courses
        $tests = Test::with('questions')
            ->whereIn('course_id', $enrolledCourseIds)
            ->get();

        $materials = Material::whereIn('course_id', $enrolledCourseIds)->get();
        $lectures = Lecture::whereIn('course_id', $enrolledCourseIds)->get();
        $scores = $user->testScores()->with('test')->get();

        return response()->json([
            'tests' => $tests,
            'materials' => $materials,
            'lectures' => $lectures,
            'scores' => $scores,
            'enrolled_courses' => $enrolledCourseIds
        ]);
    }

    public function submitTest(Request $request)
    {
        $request->validate([
            'test_id' => 'required|exists:tests,id',
            'answers' => 'required|array' // Expected format: [ question_id => selected_option_index ]
        ]);

        $user = $request->user();

        // Ensure student hasn't taken this test already (optional, based on your logic)
        if (TestScore::where('user_id', $user->id)->where('test_id', $request->test_id)->exists()) {
            return response()->json(['message' => 'You have already taken this test.'], 400);
        }

        $test = Test::with('questions')->findOrFail($request->test_id);
        $correct = 0;
        $total = $test->questions->count();

        foreach ($test->questions as $question) {
            if (isset($request->answers[$question->id]) && $request->answers[$question->id] == $question->correct_option) {
                $correct++;
            }
        }

        $percentage = $total > 0 ? round(($correct / $total) * 100) : 0;

        $score = TestScore::create([
            'user_id' => $user->id,
            'test_id' => $test->id,
            'score' => $percentage,
            'raw_score' => "{$correct}/{$total}"
        ]);

        return response()->json([
            'message' => 'Test submitted successfully!',
            'score' => $score
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateContributionRequest;
use App\Models\Contribution;
use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContributionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $month = $request->input('month', now()->month);
        $year = $request->input('year', now()->year);

        $contributions = Contribution::with('member')
            ->where('month', $month)
            ->where('year', $year)
            ->orderBy('member_id')
            ->get();

        // Create missing contribution records if needed
        if ($contributions->isEmpty()) {
            $members = Member::active()->get();
            foreach ($members as $member) {
                Contribution::create([
                    'member_id' => $member->id,
                    'month' => $month,
                    'year' => $year,
                    'amount' => 30000,
                    'status' => 'unpaid',
                ]);
            }

            $contributions = Contribution::with('member')
                ->where('month', $month)
                ->where('year', $year)
                ->orderBy('member_id')
                ->get();
        }

        return Inertia::render('admin/contributions/index', [
            'contributions' => $contributions,
            'currentMonth' => $month,
            'currentYear' => $year,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'contribution_id' => 'required|exists:contributions,id',
            'amount' => 'required|numeric|min:0',
        ]);

        $contribution = Contribution::findOrFail($request->contribution_id);
        
        $contribution->update([
            'amount' => $request->amount,
            'status' => 'paid',
            'paid_at' => now(),
        ]);

        // Update member's cash balance
        $contribution->member->increment('cash_balance', $request->amount);

        return redirect()->back()
            ->with('success', 'Payment recorded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Contribution $contribution)
    {
        $contribution->load('member');

        return Inertia::render('admin/contributions/show', [
            'contribution' => $contribution
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContributionRequest $request, Contribution $contribution)
    {
        $oldAmount = $contribution->amount;
        $newAmount = $request->validated()['amount'];
        $amountDifference = $newAmount - $oldAmount;

        $contribution->update($request->validated());

        // Update member's cash balance
        $contribution->member->increment('cash_balance', $amountDifference);

        return redirect()->route('contributions.index')
            ->with('success', 'Contribution updated successfully.');
    }
}
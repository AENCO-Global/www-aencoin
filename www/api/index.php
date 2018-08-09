<?php
    header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
    header('Content-Type: application/json');
    $filePath = '../data.json';
    $now = time();
    $softcapVolume = 15;
    $hardcapVolume = 60;
    $startCapPoint = 89.4;
    $endCapPoint = 109.7;
    $capDiff = $endCapPoint - $startCapPoint;
    $startTime = "2018-08-08 00:00:00";
    //$startTime = "2018-08-09 09:37:00";
    $startTimestamp = strtotime($startTime);
    $endTimestamp = strtotime($startTime . " +35days");
    //$endTimestamp = strtotime($startTime . " +30minutes");
    $secondPerSlot = 3600;
    //$secondPerSlot = 60;
    $numSlot = 35 * 24;
    //$numSlot = 30;
    $capPerSlot = $capDiff / $numSlot;
    $maxRandValue = $capPerSlot <= 1 ? $capPerSlot * 10 : $capPerSlot;
    $randCapBuffer = rand(1, $maxRandValue);
    //$randUpdateIntervalDelay = rand(900, 2700);
    $randUpdateIntervalDelay = rand($secondPerSlot / 4, $secondPerSlot * 3 / 4);
    $timeDiff = $now - $startTimestamp;
    $currentUpdateTimeSlotIndex = ceil($timeDiff / $secondPerSlot);
    $currentUpdateTimeSlotStart = $startTimestamp + $currentUpdateTimeSlotIndex * $secondPerSlot;
    $currentUpdateTimeSlotEnd = $currentUpdateTimeSlotStart + $secondPerSlot;
    $currentUpdateSlotValueBase = $startCapPoint + $capPerSlot * $currentUpdateTimeSlotIndex;
    try {
        $isTimeToUpdate = false;
        $json_data = file_get_contents($filePath);
        $history = json_decode($json_data, true);
        $lastHistory = end($history);
        $lastUpdateValue = 0;
        if ($lastHistory) {
            //compare to last history
            $lastUpdateTime = $lastHistory['t'];
            $lastUpdateValue = $lastHistory['v'];
            
            $isWithinCurrentTimeslot = $lastUpdateTime > $currentUpdateTimeSlotStart && $lastUpdateTime <= $currentUpdateTimeSlotEnd;
            $isTimeToUpdate = !$isWithinCurrentTimeslot && $lastUpdateValue < $endCapPoint;
        } else {
            //add new entry
            $isTimeToUpdate = true;
        }
        if ($isTimeToUpdate) {
            $nextUpdateTime = min($endTimestamp, $currentUpdateTimeSlotStart + $randUpdateIntervalDelay);
            $nextUpdateValue = min($endCapPoint, $currentUpdateSlotValueBase + $randCapBuffer);
            if ($nextUpdateValue > $lastUpdateValue) {
                $history[] = array(
                    't' => $nextUpdateTime,
                    'v' => $nextUpdateValue
                );
                $json_data = json_encode($history);
                file_put_contents($filePath, $json_data);
            }
        }
    } catch (Exception $e) {

    } 

    $responseHistory = end($history);
    $totalCapAmount = $softcapVolume * $responseHistory['v'] / 100;
    $hardCapPercentage = round($totalCapAmount / $hardcapVolume * 100, 1);

    $response = array(
        "sv" => round($responseHistory['v'], 1),
        'hv' => $hardCapPercentage
    );

    echo json_encode($response);
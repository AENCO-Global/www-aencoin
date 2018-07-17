<?php
$debug_output = FALSE;

$hostname_conn = "localhost";
$database_conn = "aenco_ico_system";
$username_conn = "myico";
$password_conn = "MyIco101";
$mysqli =  mysqli_connect($hostname_conn, $username_conn, $password_conn, $database_conn);

if(mysqli_connect_errno()) {
    if($debug_output) {
        echo "Failed to connect to database: " . mysqli_connect_error();
    } else {
        header("HTTP/1.1 500 Internal Server Error");
    }
}

const STATUS_RECEIVED = 'RECEIVED';
const STATUS_SENT_TO_IDM = 'SENT_TO_IDM';
const STATUS_UNDER_REVIEW = 'UNDER_REVIEW';
const STATUS_ACCEPTED = 'ACCEPTED';
const STATUS_REJECTED = 'REJECTED';

const KYC_VERIFIED = '2';
const KYC_PENDING = '1';
const KYC_NOT_SUBMITTED = '-1';
const KYC_REJECTED = '3';

$_POST = array_merge($_POST, (array) json_decode(file_get_contents('php://input'), TRUE));

$fail = FALSE;

if(isset($_POST['tid'])){$transaction_id = $mysqli->real_escape_string($_POST['tid']);}else{$fail = true;}  // Transaction ID
if(isset($_POST['state'])){$state = $mysqli->real_escape_string($_POST['state']);}else{$state='';} // The current state of the KYC
if(isset($_POST['res'])){$res = $mysqli->real_escape_string($_POST['res']);}else{$res='';} // Result of policy evaluation
if(isset($_POST['user'])){$user = $mysqli->real_escape_string($_POST['user']);}else{$user='';} // The current reputation of the user
if(isset($_POST['upr'])){$upr = $mysqli->real_escape_string($_POST['upr']);}else{$upr='';} // The previous reputation of the user when they were last evaluated
if(isset($_POST['erd'])){$erd = $mysqli->real_escape_string($_POST['erd']);}else{$erd='';} // A description of the reason for the user’s reputation
if(isset($_POST['ednaScoreCard'])){$edna = $mysqli->real_escape_string($_POST['ednaScoreCard']);}else{$edna='';} // The score card for the current transaction
if(isset($_POST['rcd'])){$rcd = $mysqli->real_escape_string($_POST['rcd']);}else{$rcd='';} // The set of result codes from the evaluation of the current transaction
if(isset($_POST['frn'])){$frn = $mysqli->real_escape_string($_POST['frn']);}else{$frn='';} // The name of the fraud rule that fired
if(isset($_POST['frd'])){$frd = $mysqli->real_escape_string($_POST['frd']);}else{$frd='';} // The description of the fraud rule that fired
if(isset($_POST['frp'])){$frp = $mysqli->real_escape_string($_POST['frp']);}else{$frp='';} // Result of fraud evaluation
if(isset($_POST['arpid'])){$arpid = $mysqli->real_escape_string($_POST['arpid']);}else{$arpid='';} // The ID, if any, of the automated review rule that fired
if(isset($_POST['arpd'])){$arpd = $mysqli->real_escape_string($_POST['arpd']);}else{$arpd='';} // The description, if any, of the automated review rule that fired
if(isset($_POST['arpr'])){$arpr = $mysqli->real_escape_string($_POST['arpr']);}else{$arpr='';} // Result of the automated review evaluation
if(isset($_POST['usc'])){$usc = $mysqli->real_escape_string($_POST['usc']);}else{$usc='';} // User seen count
if(isset($_POST['docVerification'])){$doc_verification = $mysqli->real_escape_string($_POST['docVerification']);}else{$doc_verification='';} // Document Verification Update

if($fail) {
    if($debug_output){
        echo 'Error: No Transaction ID found.';
    } else {
        $root_json = [
            'warning' => 'missing transaction id',
        ];

        //header("HTTP/1.1 200 OK");
        //header("Content-type:application/json");
        echo json_encode($root_json);
    }
    exit();
} else {
    // Update the idm_consumer_application Table
    $query_parameters = 'idm_state=?, idm_res=?, idm_user=?, idm_upr=?, idm_erd=?, idm_edna_score_card=?, idm_rcd=?, '
        .'idm_frn=?, idm_frd=?, idm_frp=?, idm_arpid=?, idm_arpd=?, idm_arpr=?, idm_usc=?, '
        .'idm_doc_verification=? ';
    $query = 'UPDATE idm_consumer_application SET '.$query_parameters.'WHERE transaction_id=?;';
    $statement = $mysqli->prepare($query);
    if(!$statement) {
        //if($debug_output){echo 'Error on Update of Table idm_consumer_application: '.$mysqli->error.PHP_EOL;}else{header("HTTP/1.1 500 Internal Server Error");}
        exit();
    } else {
        $statement->bind_param('ssssssssssssssss',$state,$res, $user, $upr, $erd, $edna, $rcd,
            $frn, $frd, $frp, $arpid, $arpd, $arpr, $usc, $doc_verification, $transaction_id);
        $statement_response = $statement->execute();

        if(!$statement_response) {
            //if($debug_output){echo 'Error: Update of Table idm_consumer_application Failed for transaction: '.$transaction_id.'; '.$mysqli->error.PHP_EOL;}else{header("HTTP/1.1 500 Internal Server Error");}
            exit();
        } else {
            if($debug_output){echo 'Success: Update of Table idm_consumer_application Successful for transaction: '.$transaction_id.PHP_EOL;}
        }
    }
    $statement->close();

    // Check the state of the KYC submission
    if($state == 'A') {
        $user_kyc_status = STATUS_ACCEPTED;
        $kyc = (int) KYC_VERIFIED;
        $is_kyc_decision_to_be_sent = 1;
    } else if($state == 'D') {
        $user_kyc_status = STATUS_REJECTED;
        $kyc = (int) KYC_REJECTED;
        $is_kyc_decision_to_be_sent = 1;
    } else if($state == 'R') {
        $user_kyc_status = STATUS_UNDER_REVIEW;
        $kyc = (int) KYC_PENDING;
        $is_kyc_decision_to_be_sent = 0;
    } else {
        $user_kyc_status = STATUS_RECEIVED;
        $kyc = (int) KYC_PENDING;
        $is_kyc_decision_to_be_sent = 0;
    }

    // Update the user_kyc_submission Table
    $query_parameters = 'is_kyc_decision_to_be_sent=?, status=? ';
    $query = 'UPDATE user_kyc_submission SET '.$query_parameters.'WHERE id=?;';
    $statement = $mysqli->prepare($query);
    if(!$statement) {
        //if($debug_output){echo 'Error on Update of Table user_kyc_submission: '.$mysqli->error.PHP_EOL;}else{header("HTTP/1.1 500 Internal Server Error");}
        exit();
    } else {
        $statement->bind_param('iss',$is_kyc_decision_to_be_sent, $user_kyc_status, $transaction_id);
        $statement_response = $statement->execute();

        if(!$statement_response) {
            //if($debug_output){echo 'Error: Update of Table user_kyc_submission Failed for transaction: '.$transaction_id.'; '.$mysqli->error.PHP_EOL;}else{header("HTTP/1.1 500 Internal Server Error");}
            exit();
        } else {
            if($debug_output){echo 'Success: Update of Table user_kyc_submission Successful for transaction: '.$transaction_id.PHP_EOL;}
        }
    }
    $statement->close();

    $user_id = NULL;

    // Get User ID for the IDM Transaction
    $query_parameters = '';
    $query = 'SELECT user_id FROM user_kyc_submission WHERE id=?';
    $statement = $mysqli->prepare($query);
    if(!$statement) {
        //if($debug_output){echo 'Error on Select of Table user_kyc_submission: '.$mysqli->error.PHP_EOL;}else{header("HTTP/1.1 500 Internal Server Error");}
        exit();
    } else {
        $statement->bind_param('s',$transaction_id);
        $statement_response = $statement->execute();

        if(!$statement_response) {
            //if($debug_output){echo 'Error: Select of Table user_kyc_submission Failed for transaction: '.$transaction_id.'; '.$mysqli->error.PHP_EOL;}else{header("HTTP/1.1 500 Internal Server Error");}
            exit();
        } else {
            $statement->bind_result($user_id);
            $statement->fetch();
        }
    }
    $statement->close();

    // Update the user Table
    $query_parameters = 'kyc=? ';
    $query = 'UPDATE users SET '.$query_parameters.'WHERE id=?';
    $statement = $mysqli->prepare($query);
    if(!$statement) {
        //if($debug_output){echo 'Error on Update of Table users: '.$mysqli->error.PHP_EOL;}else{header("HTTP/1.1 500 Internal Server Error");}
        exit();
    } else {
        $statement->bind_param('ss',$kyc, $user_id);
        $statement_response = $statement->execute();

        if(!$statement_response) {
            //if($debug_output){echo 'Error: Update of Table users Failed for user: '.$user_id.'; '.$mysqli->error.PHP_EOL;}else{header("HTTP/1.1 500 Internal Server Error");}
            exit();
        } else {
            $statement->close();
            //if($debug_output){echo 'Success: Update of Table users Successful for user: '.$user_id.PHP_EOL;}else{header("HTTP/1.1 200 OK");}
            exit();
        }
    }
}
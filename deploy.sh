#!/bin/bash
whoami
pwd
ssh -p 22 $2 "whoami; pwd"
echo "Version to Deploy is $1"


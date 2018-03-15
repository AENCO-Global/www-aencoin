#!/bin/bash
echo "Identify the target server"
ssh -p 22 $2 "/home/ubuntu/role.sh"

echo "Version to Deploy is $1"
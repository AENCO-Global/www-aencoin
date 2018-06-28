#!/bin/bash
echo "--=== Incoming Paramters (This script hould be reusable) ===--"
echo "[P1] Version Number is :$1 "
echo "[P2] Target Server is :$2 "
echo "[P3] Target Folder is :$3 "
echo "---------------------------------------"

echo "--=== Identify the taret server ===--"
ssh -p 22 $2 "sudo /home/ubuntu/role.sh"
ssh -p 22 $2 "sudo whoami"
echo "---------------------------------------"

echo "--=== Run local Tests on Deployment ===--"
echo "No tests yet Defined"
echo "-----------------------------------------"

echo "--=== Modify Version Information ===--"
echo "Version $1" > ./www/version.html
ls  -l
echo "--------------------------------------"

echo "--=== Set Login/Register Link ===--"
if [ "$4" = "uat" ]
    then
        echo "UAT Login/Register Set"
        sed -i -e 's/<!--uatorlive-->/uatsignup/g' ./www/index.html
        sed -i -e 's/<!--uatorlive-->/uatsignup/g' ./www/token-sale-terms-summary.html
    else
        echo "Live Login/Register Set"
        sed -i -e 's/<!--uatorlive-->/signup/g' ./www/index.html
        sed -i -e 's/<!--uatorlive-->/signup/g' ./www/token-sale-terms-summary.html
fi

echo "--=== Transfer files to remote Server ===--"
rsync -avzhe ssh  --rsync-path="rsync" ./www/* jenkins@$2:$3
echo "---------------------------------------"

echo "----====== Verify Deployments-List from Remote ======----"
ssh -p 22 $2 "ls -al /home/apache/public_html/"
ssh -p 22 $2 "ls -al $3"
echo "---------------------------------------------------------"

echo "--=== Version Deployed is [$1] The folowing output from version.info ===--"
ssh -p 22 $2 "cat $3/version.html"
echo "------------The-End-------------------------------------------------------"
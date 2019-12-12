#!/bin/sh
if [ $# != 2 ] ; then
  echo "USAGE: publish htmlFile jsFile"
  exit 1;
fi

jsFile=$2
jsFileName=$(basename $jsFile)

echo $1
echo $2
echo $jsFileName

~/apps/bin/qshell-darwin-x64-v2.4.0 fput firechat $jsFileName $jsFile

scp $1 dali2:/home/ubuntu/wildfirechat_web/src

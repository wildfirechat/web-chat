cp src/js/wfc/av/internal/engine-conference.min.js src/js/wfc/av/internal/engine.min.js
npm run release
git checkout -- src/js/wfc/av/internal/engine.min.js

indexFileName=dist/src/index.html
jsFile=`ls dist/src/wfc.*`
jsFileName=$(basename $jsFile)

echo $indexFileName
echo $jsFile
echo $jsFileName
~/apps/bin/qshell-darwin-x64-v2.4.0 fput firechat $jsFileName $jsFile
scp $indexFileName dali2:/home/ubuntu/wildfirechat_web/src

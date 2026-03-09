https://chocolatey.org/install
のコマンドを管理者権限のpower shell で叩く

choco install -y nodejs-lts
choco install -y python
npm install -g react-native-cli
choco install -y microsoft-openjdk11

エミュレータはandroidstudio使用　virtualBoxも要る?
jdkは17を使う。環境変数でjdk,vboxのpathを通す。環境変数でJAVA_HOME,ANDROID_HOMEを作る。
シェル再起動しないと反映されない

最初にプロジェクト作成:npx react-native init MyApp

androidstudioで端末起動後、
あとはプロジェクト内のREADME.MDに従う


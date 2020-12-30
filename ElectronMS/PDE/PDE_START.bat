@echo off
@title [PsychoDev] PsychoDev DataBase Editor
@color F4
set CLASSPATH=.;Dist\*
java -Djavax.net.ssl.keyStore=filename.keystore -Djavax.net.ssl.keyStorePassword=passwd -Djavax.net.ssl.trustStore=filename.keystore -Djavax.net.ssl.trustStorePassword=passwd Program.LoginUnit
pause
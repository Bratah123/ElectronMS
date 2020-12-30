@echo off
@title ElectronMS
set CLASSPATH=.;out\production\AzureSrc\*
java -Xmx2048m -Dwzpath=wz\ Start.java
pause
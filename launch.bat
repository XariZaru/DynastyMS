@echo off
set JAVA_HOME=C:\Program Files\Java\jdk1.7.0_79
set PATH=C:\Program Files\Java\jdk1.7.0_79\bin;%PATH%
@title MapleSolaxia
set CLASSPATH=.;dist\*
java -Xmx2048m -Dwzpath=wz\ net.server.Server
pause
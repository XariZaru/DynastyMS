scripts/npc/world0/9300003.js
javax.script.ScriptException: ReferenceError: "importPackage" is not defined in <eval> at line number 5
	at jdk.nashorn.api.scripting.NashornScriptEngine.throwAsScriptException(NashornScriptEngine.java:467)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:451)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:403)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:399)
	at jdk.nashorn.api.scripting.NashornScriptEngine.eval(NashornScriptEngine.java:150)
	at javax.script.AbstractScriptEngine.eval(Unknown Source)
	at scripting.AbstractScriptManager.getInvocable(AbstractScriptManager.java:69)
	at scripting.npc.NPCScriptManager.start(NPCScriptManager.java:69)
	at client.command.Commands.executePlayerCommand(Commands.java:398)
	at net.server.channel.handlers.GeneralChatHandler.handlePacket(GeneralChatHandler.java:52)
	at net.MapleServerHandler.messageReceived(MapleServerHandler.java:135)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$TailFilter.messageReceived(DefaultIoFilterChain.java:690)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1200(DefaultIoFilterChain.java:47)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:765)
	at org.apache.mina.filter.codec.ProtocolCodecFilter$ProtocolDecoderOutputImpl.flush(ProtocolCodecFilter.java:407)
	at org.apache.mina.filter.codec.ProtocolCodecFilter.messageReceived(ProtocolCodecFilter.java:236)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1200(DefaultIoFilterChain.java:47)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:765)
	at org.apache.mina.core.filterchain.IoFilterAdapter.messageReceived(IoFilterAdapter.java:109)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.fireMessageReceived(DefaultIoFilterChain.java:410)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.read(AbstractPollingIoProcessor.java:710)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.process(AbstractPollingIoProcessor.java:664)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.process(AbstractPollingIoProcessor.java:653)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.access$600(AbstractPollingIoProcessor.java:67)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor$Processor.run(AbstractPollingIoProcessor.java:1124)
	at org.apache.mina.util.NamePreservingRunnable.run(NamePreservingRunnable.java:64)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
	at java.lang.Thread.run(Unknown Source)
Caused by: <eval>:5 ReferenceError: "importPackage" is not defined
	at jdk.nashorn.internal.runtime.ECMAErrors.error(ECMAErrors.java:57)
	at jdk.nashorn.internal.runtime.ECMAErrors.referenceError(ECMAErrors.java:319)
	at jdk.nashorn.internal.runtime.ECMAErrors.referenceError(ECMAErrors.java:291)
	at jdk.nashorn.internal.objects.Global.__noSuchProperty__(Global.java:1426)
	at jdk.nashorn.internal.scripts.Script$219$\^eval\_.:program(<eval>:5)
	at jdk.nashorn.internal.runtime.ScriptFunctionData.invoke(ScriptFunctionData.java:637)
	at jdk.nashorn.internal.runtime.ScriptFunction.invoke(ScriptFunction.java:494)
	at jdk.nashorn.internal.runtime.ScriptRuntime.apply(ScriptRuntime.java:393)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:446)
	... 30 more

---------------------------------
scripts/npc/world0/9300003.js
javax.script.ScriptException: ReferenceError: "importPackage" is not defined in <eval> at line number 5
	at jdk.nashorn.api.scripting.NashornScriptEngine.throwAsScriptException(NashornScriptEngine.java:467)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:451)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:403)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:399)
	at jdk.nashorn.api.scripting.NashornScriptEngine.eval(NashornScriptEngine.java:150)
	at javax.script.AbstractScriptEngine.eval(Unknown Source)
	at scripting.AbstractScriptManager.getInvocable(AbstractScriptManager.java:69)
	at scripting.npc.NPCScriptManager.start(NPCScriptManager.java:69)
	at client.command.Commands.executePlayerCommand(Commands.java:398)
	at net.server.channel.handlers.GeneralChatHandler.handlePacket(GeneralChatHandler.java:52)
	at net.MapleServerHandler.messageReceived(MapleServerHandler.java:135)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$TailFilter.messageReceived(DefaultIoFilterChain.java:690)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1200(DefaultIoFilterChain.java:47)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:765)
	at org.apache.mina.filter.codec.ProtocolCodecFilter$ProtocolDecoderOutputImpl.flush(ProtocolCodecFilter.java:407)
	at org.apache.mina.filter.codec.ProtocolCodecFilter.messageReceived(ProtocolCodecFilter.java:236)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1200(DefaultIoFilterChain.java:47)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:765)
	at org.apache.mina.core.filterchain.IoFilterAdapter.messageReceived(IoFilterAdapter.java:109)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.fireMessageReceived(DefaultIoFilterChain.java:410)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.read(AbstractPollingIoProcessor.java:710)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.process(AbstractPollingIoProcessor.java:664)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.process(AbstractPollingIoProcessor.java:653)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.access$600(AbstractPollingIoProcessor.java:67)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor$Processor.run(AbstractPollingIoProcessor.java:1124)
	at org.apache.mina.util.NamePreservingRunnable.run(NamePreservingRunnable.java:64)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
	at java.lang.Thread.run(Unknown Source)
Caused by: <eval>:5 ReferenceError: "importPackage" is not defined
	at jdk.nashorn.internal.runtime.ECMAErrors.error(ECMAErrors.java:57)
	at jdk.nashorn.internal.runtime.ECMAErrors.referenceError(ECMAErrors.java:319)
	at jdk.nashorn.internal.runtime.ECMAErrors.referenceError(ECMAErrors.java:291)
	at jdk.nashorn.internal.objects.Global.__noSuchProperty__(Global.java:1426)
	at jdk.nashorn.internal.scripts.Script$222$\^eval\_.:program(<eval>:5)
	at jdk.nashorn.internal.runtime.ScriptFunctionData.invoke(ScriptFunctionData.java:637)
	at jdk.nashorn.internal.runtime.ScriptFunction.invoke(ScriptFunction.java:494)
	at jdk.nashorn.internal.runtime.ScriptRuntime.apply(ScriptRuntime.java:393)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:446)
	... 30 more

---------------------------------
scripts/npc/world0/9300003.js
javax.script.ScriptException: ReferenceError: "importPackage" is not defined in <eval> at line number 5
	at jdk.nashorn.api.scripting.NashornScriptEngine.throwAsScriptException(NashornScriptEngine.java:467)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:451)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:403)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:399)
	at jdk.nashorn.api.scripting.NashornScriptEngine.eval(NashornScriptEngine.java:150)
	at javax.script.AbstractScriptEngine.eval(Unknown Source)
	at scripting.AbstractScriptManager.getInvocable(AbstractScriptManager.java:69)
	at scripting.npc.NPCScriptManager.start(NPCScriptManager.java:69)
	at client.command.Commands.executePlayerCommand(Commands.java:398)
	at net.server.channel.handlers.GeneralChatHandler.handlePacket(GeneralChatHandler.java:52)
	at net.MapleServerHandler.messageReceived(MapleServerHandler.java:135)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$TailFilter.messageReceived(DefaultIoFilterChain.java:690)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1200(DefaultIoFilterChain.java:47)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:765)
	at org.apache.mina.filter.codec.ProtocolCodecFilter$ProtocolDecoderOutputImpl.flush(ProtocolCodecFilter.java:407)
	at org.apache.mina.filter.codec.ProtocolCodecFilter.messageReceived(ProtocolCodecFilter.java:236)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1200(DefaultIoFilterChain.java:47)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:765)
	at org.apache.mina.core.filterchain.IoFilterAdapter.messageReceived(IoFilterAdapter.java:109)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.fireMessageReceived(DefaultIoFilterChain.java:410)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.read(AbstractPollingIoProcessor.java:710)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.process(AbstractPollingIoProcessor.java:664)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.process(AbstractPollingIoProcessor.java:653)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.access$600(AbstractPollingIoProcessor.java:67)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor$Processor.run(AbstractPollingIoProcessor.java:1124)
	at org.apache.mina.util.NamePreservingRunnable.run(NamePreservingRunnable.java:64)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
	at java.lang.Thread.run(Unknown Source)
Caused by: <eval>:5 ReferenceError: "importPackage" is not defined
	at jdk.nashorn.internal.runtime.ECMAErrors.error(ECMAErrors.java:57)
	at jdk.nashorn.internal.runtime.ECMAErrors.referenceError(ECMAErrors.java:319)
	at jdk.nashorn.internal.runtime.ECMAErrors.referenceError(ECMAErrors.java:291)
	at jdk.nashorn.internal.objects.Global.__noSuchProperty__(Global.java:1426)
	at jdk.nashorn.internal.scripts.Script$223$\^eval\_.:program(<eval>:5)
	at jdk.nashorn.internal.runtime.ScriptFunctionData.invoke(ScriptFunctionData.java:637)
	at jdk.nashorn.internal.runtime.ScriptFunction.invoke(ScriptFunction.java:494)
	at jdk.nashorn.internal.runtime.ScriptRuntime.apply(ScriptRuntime.java:393)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:446)
	... 30 more

---------------------------------
scripts/npc/world0/9300003.js
javax.script.ScriptException: ReferenceError: "importPackage" is not defined in <eval> at line number 5
	at jdk.nashorn.api.scripting.NashornScriptEngine.throwAsScriptException(NashornScriptEngine.java:467)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:451)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:403)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:399)
	at jdk.nashorn.api.scripting.NashornScriptEngine.eval(NashornScriptEngine.java:150)
	at javax.script.AbstractScriptEngine.eval(Unknown Source)
	at scripting.AbstractScriptManager.getInvocable(AbstractScriptManager.java:69)
	at scripting.npc.NPCScriptManager.start(NPCScriptManager.java:69)
	at client.command.Commands.executePlayerCommand(Commands.java:396)
	at net.server.channel.handlers.GeneralChatHandler.handlePacket(GeneralChatHandler.java:52)
	at net.MapleServerHandler.messageReceived(MapleServerHandler.java:135)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$TailFilter.messageReceived(DefaultIoFilterChain.java:690)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1200(DefaultIoFilterChain.java:47)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:765)
	at org.apache.mina.filter.codec.ProtocolCodecFilter$ProtocolDecoderOutputImpl.flush(ProtocolCodecFilter.java:407)
	at org.apache.mina.filter.codec.ProtocolCodecFilter.messageReceived(ProtocolCodecFilter.java:236)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1200(DefaultIoFilterChain.java:47)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:765)
	at org.apache.mina.core.filterchain.IoFilterAdapter.messageReceived(IoFilterAdapter.java:109)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.fireMessageReceived(DefaultIoFilterChain.java:410)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.read(AbstractPollingIoProcessor.java:710)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.process(AbstractPollingIoProcessor.java:664)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.process(AbstractPollingIoProcessor.java:653)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.access$600(AbstractPollingIoProcessor.java:67)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor$Processor.run(AbstractPollingIoProcessor.java:1124)
	at org.apache.mina.util.NamePreservingRunnable.run(NamePreservingRunnable.java:64)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
	at java.lang.Thread.run(Unknown Source)
Caused by: <eval>:5 ReferenceError: "importPackage" is not defined
	at jdk.nashorn.internal.runtime.ECMAErrors.error(ECMAErrors.java:57)
	at jdk.nashorn.internal.runtime.ECMAErrors.referenceError(ECMAErrors.java:319)
	at jdk.nashorn.internal.runtime.ECMAErrors.referenceError(ECMAErrors.java:291)
	at jdk.nashorn.internal.objects.Global.__noSuchProperty__(Global.java:1426)
	at jdk.nashorn.internal.scripts.Script$224$\^eval\_.:program(<eval>:5)
	at jdk.nashorn.internal.runtime.ScriptFunctionData.invoke(ScriptFunctionData.java:637)
	at jdk.nashorn.internal.runtime.ScriptFunction.invoke(ScriptFunction.java:494)
	at jdk.nashorn.internal.runtime.ScriptRuntime.apply(ScriptRuntime.java:393)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:446)
	... 30 more

---------------------------------
scripts/npc/world0/9300003.js
javax.script.ScriptException: ReferenceError: "importPackage" is not defined in <eval> at line number 5
	at jdk.nashorn.api.scripting.NashornScriptEngine.throwAsScriptException(NashornScriptEngine.java:467)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:451)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:403)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:399)
	at jdk.nashorn.api.scripting.NashornScriptEngine.eval(NashornScriptEngine.java:150)
	at javax.script.AbstractScriptEngine.eval(Unknown Source)
	at scripting.AbstractScriptManager.getInvocable(AbstractScriptManager.java:69)
	at scripting.npc.NPCScriptManager.start(NPCScriptManager.java:69)
	at client.command.Commands.executePlayerCommand(Commands.java:396)
	at net.server.channel.handlers.GeneralChatHandler.handlePacket(GeneralChatHandler.java:52)
	at net.MapleServerHandler.messageReceived(MapleServerHandler.java:135)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$TailFilter.messageReceived(DefaultIoFilterChain.java:690)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1200(DefaultIoFilterChain.java:47)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:765)
	at org.apache.mina.filter.codec.ProtocolCodecFilter$ProtocolDecoderOutputImpl.flush(ProtocolCodecFilter.java:407)
	at org.apache.mina.filter.codec.ProtocolCodecFilter.messageReceived(ProtocolCodecFilter.java:236)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1200(DefaultIoFilterChain.java:47)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:765)
	at org.apache.mina.core.filterchain.IoFilterAdapter.messageReceived(IoFilterAdapter.java:109)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.fireMessageReceived(DefaultIoFilterChain.java:410)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.read(AbstractPollingIoProcessor.java:710)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.process(AbstractPollingIoProcessor.java:664)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.process(AbstractPollingIoProcessor.java:653)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.access$600(AbstractPollingIoProcessor.java:67)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor$Processor.run(AbstractPollingIoProcessor.java:1124)
	at org.apache.mina.util.NamePreservingRunnable.run(NamePreservingRunnable.java:64)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
	at java.lang.Thread.run(Unknown Source)
Caused by: <eval>:5 ReferenceError: "importPackage" is not defined
	at jdk.nashorn.internal.runtime.ECMAErrors.error(ECMAErrors.java:57)
	at jdk.nashorn.internal.runtime.ECMAErrors.referenceError(ECMAErrors.java:319)
	at jdk.nashorn.internal.runtime.ECMAErrors.referenceError(ECMAErrors.java:291)
	at jdk.nashorn.internal.objects.Global.__noSuchProperty__(Global.java:1426)
	at jdk.nashorn.internal.scripts.Script$225$\^eval\_.:program(<eval>:5)
	at jdk.nashorn.internal.runtime.ScriptFunctionData.invoke(ScriptFunctionData.java:637)
	at jdk.nashorn.internal.runtime.ScriptFunction.invoke(ScriptFunction.java:494)
	at jdk.nashorn.internal.runtime.ScriptRuntime.apply(ScriptRuntime.java:393)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:446)
	... 30 more

---------------------------------
scripts/npc/world0/9300003.js
javax.script.ScriptException: ReferenceError: "importPackage" is not defined in <eval> at line number 5
	at jdk.nashorn.api.scripting.NashornScriptEngine.throwAsScriptException(NashornScriptEngine.java:467)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:451)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:403)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:399)
	at jdk.nashorn.api.scripting.NashornScriptEngine.eval(NashornScriptEngine.java:150)
	at javax.script.AbstractScriptEngine.eval(Unknown Source)
	at scripting.AbstractScriptManager.getInvocable(AbstractScriptManager.java:69)
	at scripting.npc.NPCScriptManager.start(NPCScriptManager.java:69)
	at client.command.Commands.executePlayerCommand(Commands.java:396)
	at net.server.channel.handlers.GeneralChatHandler.handlePacket(GeneralChatHandler.java:52)
	at net.MapleServerHandler.messageReceived(MapleServerHandler.java:135)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$TailFilter.messageReceived(DefaultIoFilterChain.java:690)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1200(DefaultIoFilterChain.java:47)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:765)
	at org.apache.mina.filter.codec.ProtocolCodecFilter$ProtocolDecoderOutputImpl.flush(ProtocolCodecFilter.java:407)
	at org.apache.mina.filter.codec.ProtocolCodecFilter.messageReceived(ProtocolCodecFilter.java:236)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1200(DefaultIoFilterChain.java:47)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:765)
	at org.apache.mina.core.filterchain.IoFilterAdapter.messageReceived(IoFilterAdapter.java:109)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.fireMessageReceived(DefaultIoFilterChain.java:410)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.read(AbstractPollingIoProcessor.java:710)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.process(AbstractPollingIoProcessor.java:664)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.process(AbstractPollingIoProcessor.java:653)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.access$600(AbstractPollingIoProcessor.java:67)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor$Processor.run(AbstractPollingIoProcessor.java:1124)
	at org.apache.mina.util.NamePreservingRunnable.run(NamePreservingRunnable.java:64)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
	at java.lang.Thread.run(Unknown Source)
Caused by: <eval>:5 ReferenceError: "importPackage" is not defined
	at jdk.nashorn.internal.runtime.ECMAErrors.error(ECMAErrors.java:57)
	at jdk.nashorn.internal.runtime.ECMAErrors.referenceError(ECMAErrors.java:319)
	at jdk.nashorn.internal.runtime.ECMAErrors.referenceError(ECMAErrors.java:291)
	at jdk.nashorn.internal.objects.Global.__noSuchProperty__(Global.java:1426)
	at jdk.nashorn.internal.scripts.Script$226$\^eval\_.:program(<eval>:5)
	at jdk.nashorn.internal.runtime.ScriptFunctionData.invoke(ScriptFunctionData.java:637)
	at jdk.nashorn.internal.runtime.ScriptFunction.invoke(ScriptFunction.java:494)
	at jdk.nashorn.internal.runtime.ScriptRuntime.apply(ScriptRuntime.java:393)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:446)
	... 30 more

---------------------------------
scripts/npc/world0/9300003.js
javax.script.ScriptException: ReferenceError: "importPackage" is not defined in <eval> at line number 5
	at jdk.nashorn.api.scripting.NashornScriptEngine.throwAsScriptException(NashornScriptEngine.java:467)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:451)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:403)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:399)
	at jdk.nashorn.api.scripting.NashornScriptEngine.eval(NashornScriptEngine.java:150)
	at javax.script.AbstractScriptEngine.eval(Unknown Source)
	at scripting.AbstractScriptManager.getInvocable(AbstractScriptManager.java:69)
	at scripting.npc.NPCScriptManager.start(NPCScriptManager.java:69)
	at client.command.Commands.executePlayerCommand(Commands.java:393)
	at net.server.channel.handlers.GeneralChatHandler.handlePacket(GeneralChatHandler.java:52)
	at net.MapleServerHandler.messageReceived(MapleServerHandler.java:135)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$TailFilter.messageReceived(DefaultIoFilterChain.java:690)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1200(DefaultIoFilterChain.java:47)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:765)
	at org.apache.mina.filter.codec.ProtocolCodecFilter$ProtocolDecoderOutputImpl.flush(ProtocolCodecFilter.java:407)
	at org.apache.mina.filter.codec.ProtocolCodecFilter.messageReceived(ProtocolCodecFilter.java:236)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1200(DefaultIoFilterChain.java:47)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:765)
	at org.apache.mina.core.filterchain.IoFilterAdapter.messageReceived(IoFilterAdapter.java:109)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:417)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.fireMessageReceived(DefaultIoFilterChain.java:410)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.read(AbstractPollingIoProcessor.java:710)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.process(AbstractPollingIoProcessor.java:664)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.process(AbstractPollingIoProcessor.java:653)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor.access$600(AbstractPollingIoProcessor.java:67)
	at org.apache.mina.core.polling.AbstractPollingIoProcessor$Processor.run(AbstractPollingIoProcessor.java:1124)
	at org.apache.mina.util.NamePreservingRunnable.run(NamePreservingRunnable.java:64)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
	at java.lang.Thread.run(Unknown Source)
Caused by: <eval>:5 ReferenceError: "importPackage" is not defined
	at jdk.nashorn.internal.runtime.ECMAErrors.error(ECMAErrors.java:57)
	at jdk.nashorn.internal.runtime.ECMAErrors.referenceError(ECMAErrors.java:319)
	at jdk.nashorn.internal.runtime.ECMAErrors.referenceError(ECMAErrors.java:291)
	at jdk.nashorn.internal.objects.Global.__noSuchProperty__(Global.java:1426)
	at jdk.nashorn.internal.scripts.Script$214$\^eval\_.:program(<eval>:5)
	at jdk.nashorn.internal.runtime.ScriptFunctionData.invoke(ScriptFunctionData.java:637)
	at jdk.nashorn.internal.runtime.ScriptFunction.invoke(ScriptFunction.java:494)
	at jdk.nashorn.internal.runtime.ScriptRuntime.apply(ScriptRuntime.java:393)
	at jdk.nashorn.api.scripting.NashornScriptEngine.evalImpl(NashornScriptEngine.java:446)
	... 30 more

---------------------------------
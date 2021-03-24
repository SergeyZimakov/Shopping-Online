@ECHO OFF
FOR /d /r . %%d IN (node_modules, .git) DO (
	ECHO "Deleting %%d"
	@IF EXIST "%%d" rd /s /q "%%d"
)

const enumGeneral = {
	incorrectData: 'Email o password incorrectos',
	msgAdmin: 'Ha ocurrido un error inesperado. Vuelva a intentarlo en unos instantes o contacte con un administrador',
	emptyData: 'Los datos enviados son incorrectos o faltan'
};

const enumUser = {
	userExist: 'Ya existe un usuario con ese email',
	userNoExist: 'Usuario no encontrado',
	deleteUser: 'Usuario eliminado de la base de datos',
	userEmpty: 'No hay usuarios en la base de datos'
};

const enumTeam = {
	teamCreated: 'Equipo creado satisfactoriamente',
	teamExist: 'Ya existe un equipo con ese nombre',
	teamNoExist: 'Equipo no encontrado',
	teamDeleted: 'Equipo eliminado de la base de datos',
	teamUpdated: 'Equipo modificado correctamente',
	teamEmpty: 'No hay equipos en la base de datos'
};

const enumToken = {
	tokenEmpty: 'No hay token en la petición',
	tokenInvalid: 'Token no válido'
};

module.exports = {
	enumGeneral,
	enumUser,
	enumTeam,
	enumToken
};

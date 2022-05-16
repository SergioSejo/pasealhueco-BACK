const enumGeneral = {
	incorrectData: 'Email o password incorrectos',
	msgAdmin: 'Ha ocurrido un error inesperado. Vuelva a intentarlo en unos instantes o contacte con un administrador',
	emptyData: 'Los datos enviados son incorrectos o faltan'
};

const enumUser = {
	userExist: 'Ya existe un usuario con ese email',
	userNoExist: 'Usuario no encontrado',
	deleteUser: 'Usuario eliminado de la base de datos',
	emptyUsers: 'No hay usuarios en la base de datos'
};

const enumTeam = {
	teamExist: 'Ya existe un equipo con ese nombre',
	deleteUser: 'Equipo eliminado de la base de datos'
};

module.exports = {
	enumResponse,
	enumUser,
	enumTeam
};

const enumGeneral = {
	incorrectData: 'Email o password incorrectos',
	msgAdmin: 'Ha ocurrido un error inesperado. Vuelva a intentarlo en unos instantes o contacte con un administrador',
	emptyData: 'Los datos enviados son incorrectos o faltan'
};

const enumPlayer = {
	playerExist: 'Ya existe un usuario con ese email',
	playerNoExist: 'Usuario no encontrado',
	deletePlayer: 'Usuario eliminado de la base de datos',
	playerEmpty: 'No hay usuarios en la base de datos'
};

const enumTeam = {
	teamCreated: 'Equipo creado satisfactoriamente',
	teamExist: 'Ya existe un equipo con ese nombre',
	teamNoExist: 'Equipo no encontrado',
	teamDeleted: 'Equipo eliminado de la base de datos',
	teamUpdated: 'Equipo modificado correctamente',
	teamEmpty: 'No hay equipos en la base de datos'
};

const enumMatch = {
	matchCreated: 'Match creada satisfactoriamente',
	matchExist: 'Ya existe una match con ese nombre',
	matchNoExist: 'Match no encontrada',
	matchDeleted: 'Match eliminada de la base de datos',
	matchUpdated: 'Match modificada correctamente',
	matchEmpty: 'No hay matchs en la base de datos'
};

const enumToken = {
	tokenEmpty: 'No hay token en la petición',
	tokenInvalid: 'Token no válido'
};

module.exports = {
	enumGeneral,
	enumPlayer,
	enumTeam,
	enumToken,
	enumMatch
};

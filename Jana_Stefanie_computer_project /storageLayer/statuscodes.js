const CODES = {
    PROGRAM_ERROR: 0,
    NOT_FOUND: 1,
    INSERT_OK: 2,
    NOT_INSERTED: 3,
    ALREADY_IN_USE: 4,
    REMOVE_OK: 5,
    NOT_REMOVED: 6
}


const TYPES = {
    ERROR: 'error',
    INFO: 'info'
}

const MESSAGES = {
    PROGRAM_ERROR: () => ({
        message: 'sorry for error',
        code: CODES.PROGRAM_ERROR,
        type: TYPES.ERROR
    }),

    NOT_FOUND: (key, value) => ({
        message: `No ressource found with ${key} ${value}.`,
        code: CODES.NOT_FOUND,
        type: TYPES.ERROR
    }),

    INSERT_OK: (key, value) => ({
        message: `Ressource with ${key} ${value} was inserted.`,
        code: CODES.INSERT_OK,
        type: TYPES.INFO
    }),

    NOT_INSERTED: () => ({
        message: 'Ressource not inserted',
        code: CODES.NOT_INSERTED,
        type: TYPES.ERROR
    }),

    ALREADY_IN_USE: (value) => ({
        message: `Key ${value} is already in use`,
        code: CODES.ALREADY_IN_USE,
        type: TYPES.ERROR
    }),

    REMOVE_OK: (key, value) => ({
        message: `Ressource with ${key} ${value} was removed`,
        code: CODES.REMOVE_OK,
        type: TYPES.INFO
    }),

    NOT_REMOVED: (key, value) => ({
        message: `No ressource removed with ${key} ${value}`,
        code: CODES.NOT_REMOVED,
        type: TYPES.ERROR
    })
}

module.exports = { CODES, TYPES, MESSAGES }
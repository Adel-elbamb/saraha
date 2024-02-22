

//TRY CATCH
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(error => {
            return res.json({ message: "Catch error", error: error.message, stack: error.stack })
        })
    }
}

export const globalError = (error, req, res, next) => {
    return res.json({ message: error.message, stack: error.stack })
}
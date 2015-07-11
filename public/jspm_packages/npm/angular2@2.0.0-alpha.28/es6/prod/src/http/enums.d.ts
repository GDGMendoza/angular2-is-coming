export declare enum RequestModesOpts {
    Cors = 0,
    NoCors = 1,
    SameOrigin = 2,
}
export declare enum RequestCacheOpts {
    Default = 0,
    NoStore = 1,
    Reload = 2,
    NoCache = 3,
    ForceCache = 4,
    OnlyIfCached = 5,
}
export declare enum RequestCredentialsOpts {
    Omit = 0,
    SameOrigin = 1,
    Include = 2,
}
export declare enum RequestMethods {
    GET = 0,
    POST = 1,
    PUT = 2,
    DELETE = 3,
    OPTIONS = 4,
    HEAD = 5,
    PATCH = 6,
}
export declare enum ReadyStates {
    UNSENT = 0,
    OPEN = 1,
    HEADERS_RECEIVED = 2,
    LOADING = 3,
    DONE = 4,
    CANCELLED = 5,
}
export declare enum ResponseTypes {
    Basic = 0,
    Cors = 1,
    Default = 2,
    Error = 3,
    Opaque = 4,
}

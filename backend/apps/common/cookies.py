def set_auth_cookies(response, access_token, refresh_token, secure=False, samesite="Lax"):
    response.set_cookie(
        "access_token",
        access_token,
        httponly=True,
        secure=secure,
        samesite=samesite,
       max_age=60 * 60
    )

    response.set_cookie(
        "refresh_token",
        refresh_token,
        httponly=True,
        secure=secure,
        samesite=samesite,
        max_age=60 * 60 * 24 * 7
    )


def clear_auth_cookies(response):
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")

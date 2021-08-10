import React, { ComponentType, FC } from 'react';
import useUserAuth from '../dataLayer/hooks/useUserAuth';

const protectComponent = <P extends {}>(
    Component: ComponentType<P>,
    roles: string[],
): FC<P> => (props) => {
    const { isAuth, hasAccess } = useUserAuth(roles);

    return (
        isAuth && hasAccess ? <Component {...props} /> : null
    );
};

export default protectComponent;
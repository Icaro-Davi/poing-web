import { FC } from 'react';
import LoadWrapper from './LoadWrapper';

const LoadScreen: FC = props => {
    return (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
            <LoadWrapper isLoading>
                <div style={{ width: 50, height: 50 }}></div>
            </LoadWrapper>
        </div>
    )
}

export default LoadScreen;
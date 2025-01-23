import Loader from '@components/Loader';
import { useIsFetching } from '@tanstack/react-query';
import { IndicatorWrapper } from './FetchingIndicator.styles';

export default function FetchingIndicator() {
    const isFetching = useIsFetching();
    if (!isFetching) return null;

    return (
        <IndicatorWrapper>
            <Loader />
        </IndicatorWrapper>
    );
}

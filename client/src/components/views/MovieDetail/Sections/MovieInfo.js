import React from 'react';
import {Descriptions} from 'antd';

const MovieInfo = ({info}) => {
    return (
        <Descriptions title="Movie Info" bordered>
            <Descriptions.Item label="title">{info.title}</Descriptions.Item>
            <Descriptions.Item label="release_date">
                {info.release_date}
            </Descriptions.Item>
            <Descriptions.Item label="revenue">
                {info.revenue}
            </Descriptions.Item>
            <Descriptions.Item label="runtime">
                {info.runtime}
            </Descriptions.Item>
            <Descriptions.Item label="vote_average">
                {info.vote_average}
            </Descriptions.Item>
            <Descriptions.Item label="vote_count">
                {info.vote_count}
            </Descriptions.Item>
            <Descriptions.Item label="status">{info.status}</Descriptions.Item>
            <Descriptions.Item label="popularity">
                {info.popularity}
            </Descriptions.Item>
        </Descriptions>
    );
};

export default MovieInfo;

import { Card, Col, Form, List, Row, Select, Typography } from 'antd';
import React, { FC, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import moment from 'moment';
import AvatarList from './components/AvatarList';
import { StateType } from './model';
import { ListItemDataType } from './data.d';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;

interface ListSearchProjectsProps {
  dispatch: Dispatch<any>;
  listSearchProjects: StateType;
  loading: boolean;
}

const getKey = (id: string, index: number) => `${id}-${index}`;

const ListSearchProjects: FC<ListSearchProjectsProps> = ({
  dispatch,
  listSearchProjects: { list = [] },
}) => {
  const cardList = list && (
    <List<ListItemDataType>
      rowKey="id"
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Card className={styles.card} hoverable cover={<img alt={item.title} src={item.cover} />}>
            <Card.Meta
              title={<a>{item.title}</a>}
              description={
                <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                  {item.subDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
              <span>{moment(item.updatedAt).fromNow()}</span>
              <div className={styles.avatarList}>
                <AvatarList size="small">
                  {item.members.map((member, i) => (
                    <AvatarList.Item
                      key={getKey(item.id, i)}
                      src={member.avatar}
                      tips={member.name}
                    />
                  ))}
                </AvatarList>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <div className={styles.coverCardList}>
      <div className={styles.cardList}>{cardList}</div>
    </div>
  );
};

export default connect(
  ({
    listSearchProjects,
    loading,
  }: {
    listSearchProjects: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    listSearchProjects,
    loading: loading.models.listSearchProjects,
  }),
)(ListSearchProjects);

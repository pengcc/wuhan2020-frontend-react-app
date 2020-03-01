import * as React from 'react';
import styles from '../../../styles/elements/logistics/card.module.scss';
import Card from '../Card';
import { ILogistic } from '../../../types/interfaces';
import Message from '../../../components/Message';
import moment from 'moment';
import Button from '../Button';
import { Icon } from 'antd';
import { isMobile } from '../../../utils/deviceHelper';

interface LogisticsCardProps {
  data: ILogistic;
}

export default class LogisticsCard extends React.PureComponent<LogisticsCardProps, {}> {
  render() {
    const { data } = this.props;
    const [contact] = data.contacts;
    return (
      <Card className={styles.elementsLogisticsListCard}>
        <div className={styles.main}>
          <div className={styles.mainContent}>
            {
              /** 名称 */
              <div className={styles.title}>
                <span className={styles.name}>{data.name}</span>
                {<span className={styles.greenChannel}>{Message('GREEN_CHANNEL')}</span>}
              </div>
            }
            {
              /** 路径 */
              <section className={styles.route}>
                <div className={styles.routeItem}>
                  <span>{data.from}</span>
                  <span>{Message('SEND_FROM')}</span>
                </div>
                <div className={styles.arrow} />
                <div className={styles.routeItem}>
                  <span>{data.dest}</span>
                  <span>{Message('SEND_TO')}</span>
                </div>
              </section>
            }
            {/** 电话 */
            contact && contact.tel && (
              <div className={styles.infoItem}>
                <Icon type="mobile" />
                {isMobile ? (
                  <div>
                    {contact.tel.split(';').map(tel => (
                      <div key={tel} className={styles.mobilePhoneItem}>
                        <span className={styles.phone}>{tel}</span>
                        <Button type="link" href={`tel:${tel}`}>
                          {Message('DIAL_PHONE')}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.phone}>{contact.tel}</div>
                )}
              </div>
            )}
            {
              /** 公告 */
              <div className={styles.notice}>
                <span className={styles.source}>{Message('SOURCE')}</span>
                <span className={styles.content}>顺丰关于疫情物资运输的公告</span>
                <span className={styles.time}>2020年1月25日</span>
              </div>
            }
          </div>
          {
            /** 官网详情 */
            <div className={styles.officialInfo}>
              <Button theme="white" type="primary">
                {Message('VIEW_OFFICIAL_INFO')}
              </Button>
            </div>
          }
        </div>
      </Card>
    );
  }
}

import { homeFaqs } from '../../data/home';
import Accordion from '../../components/Accordion';
import Icon from '../../components/Icon';
import WhatsAppLink from '../../components/WhatsAppLink';

export default function HomeFaq() {
  return (
    <section className="sec">
      <div className="wrap faq">
        <div className="side rv">
          <span className="label">FAQ</span>
          <h2 className="h-l">Frequently asked questions.</h2>
          <p className="lede">Anything else, message the team. WhatsApp is the fastest way to get an answer.</p>
          <WhatsAppLink className="btn btn-deep">
            <Icon name="i-wa" />
            Ask on WhatsApp
          </WhatsAppLink>
        </div>
        <Accordion items={homeFaqs} />
      </div>
    </section>
  );
}

import monir from '../../assets/team/monir-hossin.webp';
import Icon from '../../components/Icon';

const FOCUS = ['Quality checks on every job', 'Crews on time and fully prepared', 'The same high standard, every visit'];

export default function Team() {
  return (
    <section className="sec sec-mist">
      <div className="wrap">
        <div className="lead-card">
          <div className="ph rv">
            <img src={monir} alt="Monir Hossin, Supervisor at TFCS, seated at an office desk" loading="lazy" />
          </div>
          <div className="rv d1">
            <span className="label">Meet the team</span>
            <h2 className="h-l">Monir Hossin</h2>
            <p className="role">Supervisor</p>
            <p className="lede">
              A great clean comes down to the details, and at TFCS the details answer to Monir Hossin.
            </p>
            <p className="lede">
              As our Supervisor, Monir leads our cleaning and technical crews across Dubai, from villas and apartments
              to offices, shops and warehouses. He makes sure every team arrives on time and prepared, with the right
              products and methods for each surface.
            </p>
            <p className="lede">
              No job is signed off until it meets our detailed quality checklist, corner by corner. If something is not
              right, it gets put right before we leave, so you can expect the same spotless result every time you book.
            </p>
            <ul className="focus">
              {FOCUS.map((item) => (
                <li key={item}>
                  <Icon name="i-tick" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

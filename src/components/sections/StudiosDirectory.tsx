import { STUDIOS_MEGA_MENU } from "@/lib/data/megaMenu";

function slugFromHref(href: string) {
  return href.split("#")[1] ?? "";
}

export default function StudiosDirectory() {
  return (
    <section className="section-padding border-t border-ice/10">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs tracking-[0.3em] text-neon uppercase">All Divisions</p>
        <h2 className="font-display text-3xl text-foreground md:text-4xl mb-12">
          Creative Studios Directory
        </h2>

        <div className="grid gap-8 md:grid-cols-2 md:gap-0">
          {STUDIOS_MEGA_MENU.columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className={`glass rounded-sm p-8 md:mx-4 ${
                colIndex === 0 ? "md:border-r md:border-ice/15" : ""
              }`}
            >
              <ul className="space-y-8">
                {column.items.map((item) => {
                  const id = slugFromHref(item.href);
                  return (
                    <li key={item.href} id={id} className="scroll-mt-32">
                      <div className="flex items-start gap-3">
                        <span className="mt-1 text-[10px] text-neon/60" aria-hidden>
                          ▸
                        </span>
                        <div>
                          <h3 className="font-display text-lg text-foreground">{item.label}</h3>
                          <p className="mt-2 text-sm text-muted leading-relaxed">
                            Explore our {item.label.toLowerCase()} capabilities and
                            award-winning work at Om Tatva Digitals.
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

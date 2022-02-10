import Link from "next/link";

import { POWERED_BY_URL, LOGO, SITE_NAME } from "@lib/config/constants";
import { useLocale } from "@lib/hooks/useLocale";

const PoweredByCal = () => {
  const { t } = useLocale();
  return (
    <div className="text-xs text-center sm:text-right p-1">
      <Link href={POWERED_BY_URL}>
        <a target="_blank" className="dark:text-white text-gray-500 opacity-50 hover:opacity-100">
          {t("powered_by")}{" "}
          <img className="dark:hidden w-auto inline h-[10px] relative -mt-px" src={LOGO} alt={SITE_NAME} />
          <img className="hidden dark:inline w-auto h-[10px] relativ -mt-px" src={LOGO} alt={SITE_NAME} />
        </a>
      </Link>
    </div>
  );
};

export default PoweredByCal;

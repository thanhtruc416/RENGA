import {
  RouterLink
} from "./chunk-TYNORSOC.js";
import "./chunk-SAB2J5HT.js";
import {
  ChangeDetectionStrategy,
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HH4CWJAK.js";
import "./chunk-GOMI4DH3.js";

// src/app/profile/profile-rewards.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.date;
function ProfileRewardsComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 18);
    \u0275\u0275element(2, "img", 19);
    \u0275\u0275elementStart(3, "span", 20);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "h3", 21);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 22);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 23);
    \u0275\u0275text(10, "\u0110\u1ED5i ngay");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const voucher_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("src", voucher_r1.iconUrl, \u0275\u0275sanitizeUrl)("alt", voucher_r1.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", voucher_r1.points.toLocaleString("vi-VN").replace(".", ","), " PTS");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(voucher_r1.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(voucher_r1.description);
  }
}
function ProfileRewardsComponent_For_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 17)(1, "td", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 24)(6, "span", 25);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td", 26);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r2.date);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r2.description);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("profile-rewards__type-badge--earned", row_r2.type === "EARNED")("profile-rewards__type-badge--bonus", row_r2.type === "BONUS")("profile-rewards__type-badge--redeemed", row_r2.type === "REDEEMED");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r2.type, " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("profile-rewards__points--positive", row_r2.points > 0)("profile-rewards__points--negative", row_r2.points < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatPoints(row_r2.points), " ");
  }
}
var ProfileRewardsComponent = class _ProfileRewardsComponent {
  userName = signal(
    "Ho\xE0ng Anh",
    ...ngDevMode ? [{ debugName: "userName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  vouchers = signal(
    [
      {
        id: "voucher-purchase",
        iconUrl: "/icons/ic-voucher-ticket.png",
        points: 1500,
        title: "Phi\u1EBFu mua h\xE0ng",
        description: "\xC1p d\u1EE5ng cho \u0111\u01A1n h\xE0ng thi\u1EBFt k\u1EBF ri\xEAng t\u1EEB 50.000.000 VN\u0110 tr\u1EDF l\xEAn"
      },
      {
        id: "voucher-care",
        iconUrl: "/icons/ic-voucher-wand.png",
        points: 3e3,
        title: "Ch\u0103m s\xF3c & \u0110\xE1nh b\xF3ng Cao C\u1EA5p",
        description: "D\u1ECBch v\u1EE5 l\xE0m s\u1EA1ch, \u0111\xE1nh b\xF3ng v\xE0 ki\u1EC3m tra chuy\xEAn nghi\u1EC7p cho t\u1ED1i \u0111a 3 s\u1EA3n ph\u1EA9m."
      }
    ],
    ...ngDevMode ? [{ debugName: "vouchers" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pointHistory = signal(
    [
      {
        date: "Oct 24, 2024",
        description: "Purchase: Heritage Gold Necklace",
        type: "EARNED",
        points: 2400
      },
      {
        date: "Sept 12, 2024",
        description: "Referral: Premium Member Invite",
        type: "BONUS",
        points: 500
      },
      {
        date: "Aug 05, 2024",
        description: "Redemption: Store Voucher (\xA3100)",
        type: "REDEEMED",
        points: -1e3
      }
    ],
    ...ngDevMode ? [{ debugName: "pointHistory" }] : (
      /* istanbul ignore next */
      []
    )
  );
  formatPoints(points) {
    const abs = Math.abs(points).toLocaleString("vi-VN").replace(/\./g, ",");
    return points >= 0 ? `+${abs}` : `-${abs}`;
  }
  static \u0275fac = function ProfileRewardsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProfileRewardsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileRewardsComponent, selectors: [["app-profile-rewards"]], decls: 35, vars: 1, consts: [[1, "profile-rewards"], [1, "profile-rewards__hero"], [1, "profile-rewards__hero-title"], [1, "profile-rewards__hero-subtitle"], [1, "profile-rewards__redeem"], [1, "profile-rewards__section-title"], [1, "profile-rewards__vouchers"], [1, "profile-rewards__voucher-card"], [1, "profile-rewards__bottom"], [1, "profile-rewards__back-col"], ["routerLink", "/profile", 1, "profile-rewards__back-btn"], ["src", "/icons/ic-arrow-left.png", "alt", "", 1, "profile-rewards__back-icon"], [1, "profile-rewards__history"], [1, "profile-rewards__table"], [1, "profile-rewards__table-head-row"], [1, "profile-rewards__th"], [1, "profile-rewards__th", "profile-rewards__th--right"], [1, "profile-rewards__table-row"], [1, "profile-rewards__voucher-header"], [1, "profile-rewards__voucher-icon", 3, "src", "alt"], [1, "profile-rewards__voucher-pts"], [1, "profile-rewards__voucher-title"], [1, "profile-rewards__voucher-desc"], ["type", "button", 1, "profile-rewards__voucher-btn"], [1, "profile-rewards__td"], [1, "profile-rewards__type-badge"], [1, "profile-rewards__td", "profile-rewards__td--right"]], template: function ProfileRewardsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "section", 1)(2, "h1", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 3);
      \u0275\u0275text(5, "Qu\u1EA3n l\xFD h\xE0nh tr\xECnh thi\u1EBFt k\u1EBF ri\xEAng v\xE0 c\xE1c \u0111\u1EB7c quy\u1EC1n th\xE0nh vi\xEAn c\u1EE7a b\u1EA1n.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "section", 4)(7, "h2", 5);
      \u0275\u0275text(8, "\u0110\u1ED4I TH\u01AF\u1EDENG \u0110\u1EB6C QUY\u1EC0N");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 6);
      \u0275\u0275repeaterCreate(10, ProfileRewardsComponent_For_11_Template, 11, 5, "div", 7, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 8)(13, "div", 9)(14, "a", 10);
      \u0275\u0275element(15, "img", 11);
      \u0275\u0275elementStart(16, "span");
      \u0275\u0275text(17, "Th\xF4ng tin c\xE1 nh\xE2n");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(18, "section", 12)(19, "h2", 5);
      \u0275\u0275text(20, "L\u1ECACH S\u1EEC T\xCDCH \u0110I\u1EC2M");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "table", 13)(22, "thead")(23, "tr", 14)(24, "th", 15);
      \u0275\u0275text(25, "Ng\xE0y");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "th", 15);
      \u0275\u0275text(27, "Chi ti\u1EBFt giao d\u1ECBch");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "th", 15);
      \u0275\u0275text(29, "Lo\u1EA1i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "th", 16);
      \u0275\u0275text(31, "\u0110i\u1EC3m");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "tbody");
      \u0275\u0275repeaterCreate(33, ProfileRewardsComponent_For_34_Template, 10, 14, "tr", 17, _forTrack1);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Ch\xE0o m\u1EEBng tr\u1EDF l\u1EA1i, ", ctx.userName());
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.vouchers());
      \u0275\u0275advance(23);
      \u0275\u0275repeater(ctx.pointHistory());
    }
  }, dependencies: [RouterLink], styles: ["\n.profile-rewards[_ngcontent-%COMP%] {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 0 65px 80px;\n}\n.profile-rewards__hero[_ngcontent-%COMP%] {\n  padding: 48px 0 24px;\n}\n.profile-rewards__hero-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 500;\n  color: var(--color-primary);\n  letter-spacing: -0.02em;\n  line-height: 1.25;\n  margin-bottom: 12px;\n  max-width: 894px;\n}\n.profile-rewards__hero-subtitle[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 400;\n  color: var(--color-muted);\n  line-height: 1.6;\n}\n.profile-rewards__section-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-black);\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  margin-bottom: 32px;\n}\n.profile-rewards__redeem[_ngcontent-%COMP%] {\n  border: 1px solid #2c2c2c;\n  background-color: var(--color-white);\n  padding: 40px 41px;\n  margin-bottom: 32px;\n}\n.profile-rewards__vouchers[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 32px;\n}\n.profile-rewards__voucher-card[_ngcontent-%COMP%] {\n  background-color: var(--color-primary-light);\n  border: 1px solid var(--color-black);\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  min-height: 327px;\n  position: relative;\n}\n.profile-rewards__voucher-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.profile-rewards__voucher-icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 16px;\n  object-fit: contain;\n}\n.profile-rewards__voucher-pts[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-muted);\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.profile-rewards__voucher-title[_ngcontent-%COMP%] {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: #1a1c1c;\n  line-height: 1.4;\n  margin-bottom: 16px;\n}\n.profile-rewards__voucher-desc[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-muted);\n  line-height: 1.6;\n  margin-bottom: 32px;\n  flex: 1;\n}\n.profile-rewards__voucher-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid var(--color-black);\n  background: none;\n  padding: 13px 1px;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--color-black);\n  text-align: center;\n  letter-spacing: 0.1em;\n  cursor: pointer;\n  transition: background-color 0.2s, color 0.2s;\n}\n.profile-rewards__voucher-btn[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-black);\n  color: var(--color-white);\n}\n.profile-rewards__bottom[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 285px 1fr;\n  gap: 0;\n  align-items: start;\n}\n.profile-rewards__back-col[_ngcontent-%COMP%] {\n  padding-top: 8px;\n}\n.profile-rewards__back-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-muted);\n  letter-spacing: 0.15em;\n  text-decoration: none;\n  text-transform: none;\n  transition: color 0.2s;\n}\n.profile-rewards__back-btn[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n}\n.profile-rewards__back-icon[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n  object-fit: contain;\n}\n.profile-rewards__history[_ngcontent-%COMP%] {\n  border: 1px solid #2c2c2c;\n  background-color: var(--color-white);\n  padding: 40px 41px;\n}\n.profile-rewards__table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.profile-rewards__table-head-row[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--color-black);\n}\n.profile-rewards__th[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: #1a1c1c;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n  padding: 1px 1px 16px;\n  text-align: left;\n}\n.profile-rewards__th--right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.profile-rewards__table-row[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--color-border);\n}\n.profile-rewards__table-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: 1px solid var(--color-border);\n}\n.profile-rewards__td[_ngcontent-%COMP%] {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: #1a1c1c;\n  padding: 24px 1px;\n  vertical-align: middle;\n  line-height: 1.6;\n}\n.profile-rewards__td--right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.profile-rewards__type-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  padding: 2.5px 12px;\n}\n.profile-rewards__type-badge--earned[_ngcontent-%COMP%], \n.profile-rewards__type-badge--bonus[_ngcontent-%COMP%] {\n  background-color: #eee;\n  color: #1a1c1c;\n}\n.profile-rewards__type-badge--redeemed[_ngcontent-%COMP%] {\n  background-color: #ffdad6;\n  color: #93000a;\n}\n.profile-rewards__points--positive[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--color-price);\n}\n.profile-rewards__points--negative[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #ba1a1a;\n}\n/*# sourceMappingURL=profile-rewards.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProfileRewardsComponent, [{
    type: Component,
    args: [{ selector: "app-profile-rewards", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink], template: `<div class="profile-rewards">

  <!-- Welcome Hero -->
  <section class="profile-rewards__hero">
    <h1 class="profile-rewards__hero-title">Ch\xE0o m\u1EEBng tr\u1EDF l\u1EA1i, {{ userName() }}</h1>
    <p class="profile-rewards__hero-subtitle">Qu\u1EA3n l\xFD h\xE0nh tr\xECnh thi\u1EBFt k\u1EBF ri\xEAng v\xE0 c\xE1c \u0111\u1EB7c quy\u1EC1n th\xE0nh vi\xEAn c\u1EE7a b\u1EA1n.</p>
  </section>

  <!-- \u0110\u1ED5i th\u01B0\u1EDFng \u0111\u1EB7c quy\u1EC1n -->
  <section class="profile-rewards__redeem">
    <h2 class="profile-rewards__section-title">\u0110\u1ED4I TH\u01AF\u1EDENG \u0110\u1EB6C QUY\u1EC0N</h2>
    <div class="profile-rewards__vouchers">
      @for (voucher of vouchers(); track voucher.id) {
        <div class="profile-rewards__voucher-card">
          <div class="profile-rewards__voucher-header">
            <img [src]="voucher.iconUrl" [alt]="voucher.title" class="profile-rewards__voucher-icon" />
            <span class="profile-rewards__voucher-pts">{{ voucher.points.toLocaleString('vi-VN').replace('.', ',') }} PTS</span>
          </div>
          <h3 class="profile-rewards__voucher-title">{{ voucher.title }}</h3>
          <p class="profile-rewards__voucher-desc">{{ voucher.description }}</p>
          <button class="profile-rewards__voucher-btn" type="button">\u0110\u1ED5i ngay</button>
        </div>
      }
    </div>
  </section>

  <!-- Bottom: Back nav + History Table -->
  <div class="profile-rewards__bottom">

    <!-- Back nav -->
    <div class="profile-rewards__back-col">
      <a routerLink="/profile" class="profile-rewards__back-btn">
        <img src="/icons/ic-arrow-left.png" alt="" class="profile-rewards__back-icon" />
        <span>Th\xF4ng tin c\xE1 nh\xE2n</span>
      </a>
    </div>

    <!-- Points History Table -->
    <section class="profile-rewards__history">
      <h2 class="profile-rewards__section-title">L\u1ECACH S\u1EEC T\xCDCH \u0110I\u1EC2M</h2>
      <table class="profile-rewards__table">
        <thead>
          <tr class="profile-rewards__table-head-row">
            <th class="profile-rewards__th">Ng\xE0y</th>
            <th class="profile-rewards__th">Chi ti\u1EBFt giao d\u1ECBch</th>
            <th class="profile-rewards__th">Lo\u1EA1i</th>
            <th class="profile-rewards__th profile-rewards__th--right">\u0110i\u1EC3m</th>
          </tr>
        </thead>
        <tbody>
          @for (row of pointHistory(); track row.date) {
            <tr class="profile-rewards__table-row">
              <td class="profile-rewards__td">{{ row.date }}</td>
              <td class="profile-rewards__td">{{ row.description }}</td>
              <td class="profile-rewards__td">
                <span
                  class="profile-rewards__type-badge"
                  [class.profile-rewards__type-badge--earned]="row.type === 'EARNED'"
                  [class.profile-rewards__type-badge--bonus]="row.type === 'BONUS'"
                  [class.profile-rewards__type-badge--redeemed]="row.type === 'REDEEMED'"
                >
                  {{ row.type }}
                </span>
              </td>
              <td
                class="profile-rewards__td profile-rewards__td--right"
                [class.profile-rewards__points--positive]="row.points > 0"
                [class.profile-rewards__points--negative]="row.points < 0"
              >
                {{ formatPoints(row.points) }}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </section>

  </div>

</div>
`, styles: ["/* src/app/profile/profile-rewards.component.css */\n.profile-rewards {\n  max-width: var(--max-width);\n  margin: 0 auto;\n  padding: 0 65px 80px;\n}\n.profile-rewards__hero {\n  padding: 48px 0 24px;\n}\n.profile-rewards__hero-title {\n  font-family: var(--font-serif);\n  font-size: 64px;\n  font-weight: 500;\n  color: var(--color-primary);\n  letter-spacing: -0.02em;\n  line-height: 1.25;\n  margin-bottom: 12px;\n  max-width: 894px;\n}\n.profile-rewards__hero-subtitle {\n  font-family: var(--font-sans);\n  font-size: 18px;\n  font-weight: 400;\n  color: var(--color-muted);\n  line-height: 1.6;\n}\n.profile-rewards__section-title {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: var(--color-black);\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  margin-bottom: 32px;\n}\n.profile-rewards__redeem {\n  border: 1px solid #2c2c2c;\n  background-color: var(--color-white);\n  padding: 40px 41px;\n  margin-bottom: 32px;\n}\n.profile-rewards__vouchers {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 32px;\n}\n.profile-rewards__voucher-card {\n  background-color: var(--color-primary-light);\n  border: 1px solid var(--color-black);\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  min-height: 327px;\n  position: relative;\n}\n.profile-rewards__voucher-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.profile-rewards__voucher-icon {\n  width: 20px;\n  height: 16px;\n  object-fit: contain;\n}\n.profile-rewards__voucher-pts {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-muted);\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.profile-rewards__voucher-title {\n  font-family: var(--font-serif);\n  font-size: 24px;\n  font-weight: 400;\n  color: #1a1c1c;\n  line-height: 1.4;\n  margin-bottom: 16px;\n}\n.profile-rewards__voucher-desc {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: var(--color-muted);\n  line-height: 1.6;\n  margin-bottom: 32px;\n  flex: 1;\n}\n.profile-rewards__voucher-btn {\n  width: 100%;\n  border: 1px solid var(--color-black);\n  background: none;\n  padding: 13px 1px;\n  font-family: var(--font-sans);\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--color-black);\n  text-align: center;\n  letter-spacing: 0.1em;\n  cursor: pointer;\n  transition: background-color 0.2s, color 0.2s;\n}\n.profile-rewards__voucher-btn:hover {\n  background-color: var(--color-black);\n  color: var(--color-white);\n}\n.profile-rewards__bottom {\n  display: grid;\n  grid-template-columns: 285px 1fr;\n  gap: 0;\n  align-items: start;\n}\n.profile-rewards__back-col {\n  padding-top: 8px;\n}\n.profile-rewards__back-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--color-muted);\n  letter-spacing: 0.15em;\n  text-decoration: none;\n  text-transform: none;\n  transition: color 0.2s;\n}\n.profile-rewards__back-btn:hover {\n  color: var(--color-primary);\n}\n.profile-rewards__back-icon {\n  width: 12px;\n  height: 12px;\n  object-fit: contain;\n}\n.profile-rewards__history {\n  border: 1px solid #2c2c2c;\n  background-color: var(--color-white);\n  padding: 40px 41px;\n}\n.profile-rewards__table {\n  width: 100%;\n  border-collapse: collapse;\n}\n.profile-rewards__table-head-row {\n  border-bottom: 1px solid var(--color-black);\n}\n.profile-rewards__th {\n  font-family: var(--font-sans);\n  font-size: 12px;\n  font-weight: 600;\n  color: #1a1c1c;\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n  padding: 1px 1px 16px;\n  text-align: left;\n}\n.profile-rewards__th--right {\n  text-align: right;\n}\n.profile-rewards__table-row {\n  border-bottom: 1px solid var(--color-border);\n}\n.profile-rewards__table-row:last-child {\n  border-bottom: 1px solid var(--color-border);\n}\n.profile-rewards__td {\n  font-family: var(--font-sans);\n  font-size: 16px;\n  font-weight: 400;\n  color: #1a1c1c;\n  padding: 24px 1px;\n  vertical-align: middle;\n  line-height: 1.6;\n}\n.profile-rewards__td--right {\n  text-align: right;\n}\n.profile-rewards__type-badge {\n  display: inline-block;\n  font-family: var(--font-sans);\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  padding: 2.5px 12px;\n}\n.profile-rewards__type-badge--earned,\n.profile-rewards__type-badge--bonus {\n  background-color: #eee;\n  color: #1a1c1c;\n}\n.profile-rewards__type-badge--redeemed {\n  background-color: #ffdad6;\n  color: #93000a;\n}\n.profile-rewards__points--positive {\n  font-weight: 700;\n  color: var(--color-price);\n}\n.profile-rewards__points--negative {\n  font-weight: 700;\n  color: #ba1a1a;\n}\n/*# sourceMappingURL=profile-rewards.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileRewardsComponent, { className: "ProfileRewardsComponent", filePath: "src/app/profile/profile-rewards.component.ts", lineNumber: 27 });
})();
export {
  ProfileRewardsComponent
};
//# sourceMappingURL=chunk-XFUL65CY.js.map

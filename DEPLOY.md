# Cloudflare 배포 가이드

이 프로젝트는 **Next.js 정적 내보내기 (Static Export)** 방식으로 설정되어 있어, Cloudflare Pages에 무료로 쉽게 배포할 수 있습니다.

## 🚨 중요: "Pages" vs "Workers" 확인

Cloudflare 대시보드에서 프로젝트를 생성할 때, 반드시 **[Pages]** 탭을 선택해야 합니다.
**만약 설정 화면에 "Deploy command", "Non-production branch deploy command" 같은 항목이 보인다면, 잘못된 프로젝트(Workers)를 생성하신 것입니다.**

이 경우, 해당 프로젝트를 삭제하고 아래 **방법 1**을 따라 다시 **Pages** 프로젝트로 생성해 주세요.

---

## 방법 1: GitHub 연동 (권장)

가장 편리하고 자동화된 방법입니다. GitHub에 코드를 푸시하면 자동으로 배포됩니다.

1.  [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create Application** 클릭.
2.  화면 중간의 **[Pages] 탭**을 클릭합니다. (기본값은 Workers입니다)
3.  **Connect to Git**을 누르고 저장소를 선택합니다.
4.  **Build settings** 설정:
    *   **Framework preset**: `Next.js (Static Export)` 선택
    *   **Build command**: `npm run build`
    *   **Build output directory**: `out` (Preset 선택 시 자동 입력됨)
5.  **Save and Deploy**를 클릭합니다.

---

## 방법 2: Wrangler CLI (터미널 배포)

웹 대시보드가 복잡하거나 오류가 날 경우, 터미널에서 명령어로 바로 배포할 수 있습니다.

1.  프로젝트 폴더에서 터미널을 열고 빌드합니다:
    ```bash
    npm run build
    ```
2.  다음 명령어로 Cloudflare에 로그인합니다 (최초 1회):
    ```bash
    npx wrangler login
    ```
    (브라우저가 뜨면 허용(Allow)을 눌러주세요)
3.  `out` 폴더를 Cloudflare Pages로 배포합니다:
    ```bash
    npx wrangler pages deploy out --project-name web-ruler
    ```
4.  "Create a new project?"라고 물으면 `y`를 누르거나, 기존 프로젝트를 선택합니다.
5.  배포가 완료되면 URL이 표시됩니다.

---

## 방법 3: 직접 업로드 (Direct Upload)

GitHub 없이 로컬 파일을 직접 올리는 방법입니다.

1.  `npm run build` 명령어로 빌드하여 `out` 폴더를 생성합니다.
2.  Cloudflare Dashboard > **Workers & Pages** > **Create Application** > **Pages** 탭 > **Upload Assets** 선택.
3.  프로젝트 이름 입력 후 `out` 폴더를 드래그 앤 드롭합니다.

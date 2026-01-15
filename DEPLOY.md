# Cloudflare 배포 가이드

이 프로젝트는 **Next.js 정적 내보내기 (Static Export)** 방식으로 설정되어 있어, Cloudflare Pages에 무료로 쉽게 배포할 수 있습니다.

## 방법 1: GitHub 연동 (권장)

가장 편리하고 자동화된 방법입니다. GitHub에 코드를 푸시하면 자동으로 배포됩니다.

1.  이 프로젝트를 본인의 **GitHub 저장소**에 푸시합니다.
2.  [Cloudflare Dashboard](https://dash.cloudflare.com/)에 로그인하고, **Workers & Pages** > **Create Application** > **Pages** > **Connect to Git**을 선택합니다.
3.  방금 푸시한 저장소를 선택합니다.
4.  **Build settings** 설정:
    *   **Framework preset**: `Next.js (Static Export)` 선택 (없을 경우 `None` 선택)
    *   **Build command**: `npm run build`
    *   **Build output directory**: `out`
5.  **Save and Deploy**를 클릭합니다.

## 방법 2: 직접 업로드 (Direct Upload)

GitHub 없이 로컬에서 빌드한 파일을 직접 올리는 방법입니다.

1.  프로젝트 폴더에서 터미널을 열고 다음 명령어를 실행하여 빌드합니다:
    ```bash
    npm run build
    ```
    *   성공하면 프로젝트 폴더에 `out`이라는 폴더가 생성됩니다.
2.  [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create Application** > **Pages** > **Upload Assets** 탭을 선택합니다.
3.  프로젝트 이름을 입력하고 **Create Project**를 클릭합니다.
4.  방금 생성된 `out` 폴더를 브라우저 창으로 드래그 앤 드롭합니다.
5.  **Deploy Site**를 클릭하면 즉시 배포됩니다.

---

### 참고 사항
*   **Next.js 설정**: 이미 `next.config.ts`에 `output: 'export'` 설정을 추가해 두었습니다. 이 설정 덕분에 빌드 시 `out` 폴더가 생성됩니다.
*   **이미지 최적화**: `output: 'export'` 모드에서는 Next.js의 기본 이미지 최적화 서버를 사용할 수 없으므로, `unoptimized: true` 설정도 추가해 두었습니다.

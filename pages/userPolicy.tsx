import React from 'react'
import type { NextPage } from 'next'
import Layout from '../components/Layout'

const Policy: NextPage = () => {
  return (
    <Layout>
      <div className="mt-3 mb-4 leading-7 tracking-wider">
        <h1 className="font-extrabold text-3xl mt-12 mb-8">プライバシーポリシー</h1>
        <p className="mt-2">
          <p className="text-left">
            本プライバシーポリシーは、本サービスを利用するすべてのユーザーに適用されます。
          </p>
          <h2 className="text-left font-extrabold text-2xl mt-8 mb-6 border-b pb-2 border-slate-100/30">ユーザーから取得する情報</h2>
          <p className="text-left">
            本サービスは、ユーザーから以下の情報を取得します。
            <ul className="list-disc">
              <li className="ml-6">外部サービスでユーザーが利用するID、その他外部サービスのプライバシー設定によりユーザーが連携先に開示を認めた情報</li>
              <li className="ml-6">Cookie(クッキー)を用いて生成された識別情報</li>
            </ul>
            上記の情報は、ユーザーのクライアントでのみ利用され、本サービスが収集することはありません。
            <br />
            本サービスの利用を停止したい場合は、以下のページ内の手順を参考にSpotifyとの接続を解除してください。
            <p className="font-semibold">
              <a
                href="https://support.spotify.com/jp/article/spotify-on-other-apps/"
                target="_blank"
                rel="noopener noreferrer"
              >
                他のアプリでSpotifyを使う
              </a>
            </p>
          </p>
          <h2 className="text-left font-extrabold text-2xl mt-8 mb-6 border-b pb-2 border-slate-100/30">ユーザーの情報を利用する目的</h2>
            <p className="text-left">
              本サービスは、ユーザーから取得した情報を、以下の目的のために利用します。
              <ul className="list-disc">
                <li className="ml-6">本サービスを利用するユーザーのSpotifyアカウントの認可のため</li>
              </ul>
            </p>
          <h2 className="text-left font-extrabold text-2xl mt-8 mb-6 border-b pb-2 border-slate-100/30">プライバシーポリシーの変更</h2>
            <p className="text-left">
              本サービスは、必要に応じて、このプライバシーポリシーの内容を変更します。
              <br />
              この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
            </p>
          </p>
        <h1 className="font-extrabold text-3xl mt-12 mb-8">利用規約</h1>
        <p className="mt-2">
          <p className="text-left">
            この利用規約(以下、「本規約」といいます。)は、本サービス(本サイトを含むものとし、以下、特に両者を区別しません。)の利用条件を定めるものです。
            <br />
            本規約は、本サービスを利用するすべてのユーザーに適用されます。
          </p>
          <h2 className="text-left font-extrabold text-2xl mt-8 mb-6 border-b pb-2 border-slate-100/30">本規約への同意</h2>
            <p className="text-left">
              ユーザーは、本サービスを利用することによって、本規約に有効かつ取り消し不能な同意をしたものとみなされます。本規約に同意しないユーザーは、本サービスをご利用いただけません。
            </p>
          <h2 className="text-left font-extrabold text-2xl mt-8 mb-6 border-b pb-2 border-slate-100/30">コンテンツのご利用</h2>
            <p className="text-left">
              本サービスは、ユーザーに対し、本サービスが提供する文章、画像、動画、音声、音楽、ソフトウェア、プログラム、コードその他のコンテンツについて、本サービスの利用範囲内における私的な利用を許諾します。
              <br />
              この範囲を超えて本サービスが提供するコンテンツを利用することは一切禁止します。
              <br />
              理由の如何を問わず、ユーザーが本サービスを利用する権利を失った場合、本サービスの一切のコンテンツの利用ができなくなることを、ユーザーは予め承諾するものとします。
            </p>
          <h2 className="text-left font-extrabold text-2xl mt-8 mb-6 border-b pb-2 border-slate-100/30">禁止事項</h2>
            <p className="text-left">ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
              <ul className="list-disc">
                <li className="ml-6">法令、裁判所の判決、決定若しくは命令、又は法令上拘束力のある行政措置に違反する行為又はこれらを助長する行為</li>
                <li className="ml-6">犯罪行為に関連する行為</li>
                <li className="ml-6">本サービスや第三者の知的財産権を侵害する行為</li>
                <li className="ml-6">本サービスやや第三者の肖像権、プライバシー、名誉、その他の権利又は利益を侵害する行為</li>
                <li className="ml-6">本サービスや第三者のサーバーまたはネットワークに過度の負担をかけたり、その正常な作動を妨害する行為</li>
                <li className="ml-6">本サービスのサービスの運営を妨害するおそれのある行為</li>
                <li className="ml-6">不正アクセスをし、またはこれを試みる行為</li>
                <li className="ml-6">本サービスに接続しているシステムに権限なく不正にアクセスし又は本サービス設備に蓄積された情報を不正に書き換え若しくは消去する行為</li>
                <li className="ml-6">本サービスのウェブサイトやソフトウェアを複製、送信、譲渡、貸与又は改変する行為</li>
                <li className="ml-6">本サービス上のアカウント又はコンテンツを第三者に有償で貸与、譲渡、売買等をする行為</li>
                <li className="ml-6">本サービスによって得られた情報を商業的に利用する行為</li>
                <li className="ml-6">本サービスが意図しない方法によって本サービスに関連して利益を得ることを目的とする行為</li>
                <li className="ml-6">本サービスが許諾しない本サービス上での宣伝、広告、勧誘、または営業行為</li>
                <li className="ml-6">他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                <li className="ml-6">違法、不正又は不当な目的を持って本サービスを利用する行為</li>
                <li className="ml-6">本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為</li>
                <li className="ml-6">他のユーザーに成りすます行為</li>
                <li className="ml-6">他のユーザーのアカウントを利用する行為</li>
                <li className="ml-6">面識のない異性との出会いを目的とした行為</li>
                <li className="ml-6">反社会的勢力に対して直接または間接に利益を供与する行為</li>
                <li className="ml-6">公序良俗に違反する行為</li>
                <li className="ml-6">車両運転中、その他本サービスの利用が不適切な状況又は態様において本サービスを利用する行為</li>
                <li className="ml-6">その他、本サービスが不適切と判断する行為</li>
              </ul>
            </p>
          <h2 className="text-left font-extrabold text-2xl mt-8 mb-6 border-b pb-2 border-slate-100/30">換金行為の禁止</h2>
            <p className="text-left">本サービス内で取得した一切のコンテンツについては、手段の如何を問わず、以下の取引を一切禁止します。
              <ul className="list-disc">
                <li className="ml-6">売買</li>
                <li className="ml-6">金銭その他の対価を授受する形でのあらゆる譲渡、譲受、貸与、借用等</li>
                <li className="ml-6">その他換金行為に該当すると本サービスが判断する一切の行為</li>
              </ul>
            </p>
          <h2 className="text-left font-extrabold text-2xl mt-8 mb-6 border-b pb-2 border-slate-100/30">反社会的勢力の排除</h2>
            <p className="text-left">ユーザーは、次の各号のいずれか一にも該当しないことを表明し、かつ将来にわたっても該当しないことを表明し、保証するものとします。
              <ul className="list-disc">
                <li className="ml-6">ユーザーは、自らまたは第三者を利用して次の各号のいずれか一にでも該当する行為を行わないことを保証するものとします。</li>
                <li className="ml-6">暴力的な要求行為</li>
                <li className="ml-6">法的な責任を超えた不当な要求行為</li>
                <li className="ml-6">取引に関して、脅迫的な言動をし、または暴力を用いる行為</li>
                <li className="ml-6">風説を流布し、偽計を用い、または威力を用いて、本サービスの信用を毀損し、または本サービスの業務を妨害する行為</li>
                <li className="ml-6">その他前各号に準ずる行為</li>
              </ul>
            </p>
          <h2 className="text-left font-extrabold text-2xl mt-8 mb-6 border-b pb-2 border-slate-100/30">利用制限</h2>
            <p className="text-left">
              本サービスは、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本サービスの全部もしくは一部の利用を制限できるものとします。
              <br />
              本サービスは、本条に基づき本サービスが行った行為によりユーザーに生じた損害について、一切の責任を負いません。
              <ul className="list-disc">
                <li className="ml-6">本規約のいずれかの条項に違反した場合</li>
                <li className="ml-6">本サービスからの連絡に対し、相当の期間が経過しても返答がない場合</li>
                <li className="ml-6">反社会的勢力等であるか、反社会的勢力等との何らかの交流若しくは関与を行っていると本サービスが判断した場合</li>
                <li className="ml-6">その他、本サービスが本サービスの利用を適当でないと判断した場合</li>
              </ul>
            </p>
          <h2 className="text-left font-extrabold text-2xl mt-8 mb-6 border-b pb-2 border-slate-100/30">本サービスの提供の停止</h2>
            <p className="text-left">
              本サービスは、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
              <br />
              本サービスは、この場合にユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
              <ul className="list-disc">
                <li className="ml-6">本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                <li className="ml-6">地震、落雷、火災、停電、天災またはウィルスの蔓延などの不可抗力により、本サービスの提供が困難となった場合</li>
                <li className="ml-6">コンピュータまたは通信回線等が事故により停止した場合</li>
                <li className="ml-6">その他、本サービスが本サービスの提供が困難と判断した場合</li>
              </ul>
            </p>
          <h2 className="text-left font-extrabold text-2xl mt-8 mb-6 border-b pb-2 border-slate-100/30">保証の否認</h2>
            <p className="text-left">
              本サービスは、本サービスや本サービスが提供するコンテンツに、システムバグや第三者の権利侵害が含まれないことを保証するものではありません。
              <br />
              また、安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性を保証するものでもありません。
            </p>
          <h2 className="text-left font-extrabold text-2xl mt-8 mb-6 border-b pb-2 border-slate-100/30">免責</h2>
            <p className="text-left">
              本サービスは、本サービスに関してユーザーに生じたあらゆる損害について一切の責任を負いません。
              <br />
              ただし、本サービスに関する本サービスとユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
              <br />
              消費者契約に該当する場合であっても、本サービスは、本サービスの過失（重過失を除きます。）によってユーザーに生じた損害のうち特別の事情から生じた損害（本サービスまたはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について、一切の責任を負いません。
              <br />
              ユーザーと他のユーザーまたは第三者との間において生じたトラブルについても一切責任を負いません。
              <br />
              本サービスは、本サービスに関してユーザーが被った損害につき、当該損害が発生した月内にユーザーが本サービスに支払った利用料金を超えて賠償する責任を負わないものとします。
            </p>
          <h2 className="text-left font-extrabold text-2xl mt-8 mb-6 border-b pb-2 border-slate-100/30">サービス内容の変更</h2>
            <p className="text-left">
              本サービスは、ユーザーに通知することなく、本サービスの内容を変更したり、本サービスの提供を中止、終了することができるものとします。
              <br />
              ユーザーは、本サービスが終了した場合、コンテンツを利用する一切の権利を失い、以後、当該コンテンツを利用できなくなることについて、あらかじめ、異議なく同意するものとします。
              <br />
              本サービスは、これらによってユーザーに生じた損害について一切の責任を負いません。
            </p>
          <h2 className="text-left font-extrabold text-2xl mt-8 mb-6 border-b pb-2 border-slate-100/30">利用規約の変更</h2>
            <p className="text-left">
              本サービスは、ユーザーに通知することなく、いつでも本規約を変更することができるものとします。
              <br />
              変更後の本規約は、本サービスウェブサイトに掲示された時点から効力を生じるものとします。
              <br />
              本規約の変更後、本サービスの利用を継続したユーザーは、変更後の本規約に同意したものとみなします。
            </p>
          <h2 className="text-left font-extrabold text-2xl mt-8 mb-6 border-b pb-2 border-slate-100/30">適用関係</h2>
            <p className="text-left">
              本規約は、ユーザーと本サービスとの間の本サービスの利用に関わる一切の関係に適用されるものとします。
              <br />
              本サービスは本サービスに関し、本規約のほか、ご利用にあたってのルールを定めることがあります。
              <br />
              これらのルールは、その名称のいかんに関わらず、本規約の一部を構成するものとします。本規約がこれらのルールと矛盾する場合には、これらのルールが優先して適用されるものとします。
            </p>
          <h2 className="text-left font-extrabold text-2xl mt-8 mb-6 border-b pb-2 border-slate-100/30">分離可能性</h2>
            <p className="text-left">
              本規約のいずれかの条項又はその一部が無効又は執行不能と判断された場合であっても、当該判断は他の部分に影響を及ぼさず、本規約の残りの部分は、引き続き有効かつ執行力を有するものとします。
            </p>
          <h2 className="text-left font-extrabold text-2xl mt-8 mb-6 border-b pb-2 border-slate-100/30">準拠法・裁判管轄</h2>
            <p className="text-left">
              本規約の解釈にあたっては、日本法を準拠法とします。
              <br />
              本サービスに関して紛争が生じた場合には、本サービスの本店所在地を管轄する地方裁判所を専属的合意管轄とします。
            </p>
          <br />
          <p className="text-left">
            2022年12月16日 制定
          </p>
        </p>
      </div>
    </Layout>
  )
}

export default Policy

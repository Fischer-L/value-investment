import React, { Component } from 'react';

import 'semantic-ui-css/semantic.min.css';
import '@/css/App.scss';

import { loginManager } from '@/api/index';
import MARKET_TYPE from '@/utils/marketType';
import MainBar, { BOOKMARK_BTN_ID } from '@/components/MainBar';
import StockNoteBoard from '@/components/NoteBoard/StockNoteBoard';
import ValueBoard from '@/components/ValueBoard';
import BookmarkBoardTW from '@/components/BookmarkBoard/BookmarkBoardTW';
import BookmarkBoardUS from '@/components/BookmarkBoard/BookmarkBoardUS';
import BookmarkBoardStory from '@/components/BookmarkBoard/BookmarkBoardStory';
import Prompt, { ACTION } from '@/components/Prompt';
import CalculationPanel from '@/components/CalculationPanel';

import icoHen from '@/assets/ico_hen.svg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      market: '',
      stockId: null,
      currentBookmarkBtnId: null,
      askLogin: false,
      lookupTime: 0,
      isLogin: loginManager.isLogin(),
      allowLogin: loginManager.allowLogin(),
    };

    this.whenLookUpStock = ({ stockId, market }) => {
      this.setState({ stockId, market, lookupTime: Date.now() });
    };

    this.whenToggleBookmark = ({ btnId }) => {
      this.setState((prevState) => {
        const currentBookmarkBtnId = prevState.currentBookmarkBtnId === btnId ? null : btnId;
        document.body.style.overflow = currentBookmarkBtnId ? 'hidden' : '';
        return { currentBookmarkBtnId };
      });
    };

    this.whenCloseBookmark = () => {
      this.whenToggleBookmark({ btnId: null });
    };

    this.whenLogin = async () => {
      const { isLogin, askLogin, allowLogin } = this.state;
      if (isLogin || !allowLogin) {
        await loginManager.logout();
        this.setState({
          isLogin: loginManager.isLogin(),
          allowLogin: loginManager.allowLogin(),
        });
      } else if (!isLogin && !askLogin && allowLogin) {
        this.setState({ askLogin: true });
      }
    };

    this.whenLoginPromptClose = async ({ action, input }) => {
      this.setState({ askLogin: false });
      if (action === ACTION.OK && input) {
        await loginManager.login(input);
        this.setState({
          isLogin: loginManager.isLogin(),
          allowLogin: loginManager.allowLogin(),
        });
      }
    };

    this.mainBarCallbacks = {
      whenLogin: this.whenLogin,
      whenLookUpStock: this.whenLookUpStock,
      whenToggleBookmark: this.whenToggleBookmark,
    };
  }

  renderBeginComponent() {
    return (
      <div className="appContent-begin" key="appContent-begin">
        <img src={icoHen} width="88px" alt="Hen..." />
        <p>Enter the stock id to look up</p>
      </div>
    );
  }

  renderLoginPrompt({ isLogin, askLogin, allowLogin }) {
    if (!isLogin && askLogin && allowLogin) {
      return <Prompt hasInput title="Passcode" whenClose={this.whenLoginPromptClose} />;
    }
    return null;
  }

  renderBookmarkBoards({ currentBookmarkBtnId }) {
    const boards = [];

    const propsOfBookmarkBoardTW = {
      whenLookUpStock: this.whenLookUpStock,
      whenCloseBookmark: this.whenCloseBookmark,
      show: currentBookmarkBtnId === BOOKMARK_BTN_ID.TW,
    };
    boards.push(<BookmarkBoardTW key="BookmarkBoardTW" {...propsOfBookmarkBoardTW} />);

    const propsOfBookmarkBoardUS = {
      whenLookUpStock: this.whenLookUpStock,
      whenCloseBookmark: this.whenCloseBookmark,
      show: currentBookmarkBtnId === BOOKMARK_BTN_ID.US,
    };
    boards.push(<BookmarkBoardUS key="BookmarkBoardUS" {...propsOfBookmarkBoardUS} />);

    const propsOfBookmarkBoardStory = {
      whenCloseBookmark: this.whenCloseBookmark,
      show: currentBookmarkBtnId === BOOKMARK_BTN_ID.STORY,
    };
    boards.push(<BookmarkBoardStory key="BookmarkBoardStory" {...propsOfBookmarkBoardStory} />);

    return boards;
  }

  renderNoteBoard({ stockId, isLogin, allowLogin }) {
    if (allowLogin && isLogin) {
      return <StockNoteBoard key="StockNoteBoard" stockId={stockId} />;
    }
    return null;
  }

  renderValueBoard({ stockId, market, lookupTime }) {
    return <ValueBoard stockId={stockId} market={market} lookupTime={lookupTime} key="ValueBoard" />;
  }

  render() {
    const appContent = [];
    const { stockId, market, isLogin, allowLogin } = this.state;

    if (!stockId) {
      appContent.push(this.renderBeginComponent());
    } else {
      if (market === MARKET_TYPE.TW) {
        appContent.push(this.renderValueBoard(this.state));
      }
      appContent.push(this.renderNoteBoard(this.state));
    }

    return (
      <div className="app">
        <MainBar isLogin={isLogin} allowLogin={allowLogin} {...this.mainBarCallbacks} />
        <section className="appContent">
          {appContent}
          { this.renderBookmarkBoards(this.state) }
        </section>
        { this.renderLoginPrompt(this.state) }
        <CalculationPanel />
      </div>
    );
  }
}

export default App;

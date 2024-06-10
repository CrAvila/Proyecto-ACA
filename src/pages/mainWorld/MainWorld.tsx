
import './mainWorld.scss'
import { Link, Outlet, useLocation } from 'react-router-dom';
export function MainWorld(): JSX.Element {

    return (
        <Link to="/home">
            <button className="button button--secondary">
                Explorar Más
            </button>
        </Link>

    )
}
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ShootingController
 * @package App\Controller
 * @Route("/shooting")
 */
class ShootingController extends AbstractController
{
//    /**
//     * @Route("/shooting", name="shooting")
//     */
//    public function index()
//    {
//        return $this->render('shooting/index.html.twig', [
//            'controller_name' => 'ShootingController',
//        ]);
//    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     * @Route("/par-timer", name="app_par_timer")
     */
    public function parTimer()
    {
        return $this->render('shooting/par-timer.html.twig', []);
    }
}

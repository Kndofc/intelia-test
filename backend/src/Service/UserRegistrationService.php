<?php

namespace App\Service;

use App\Entity\UserRegistration;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityNotFoundException;

class UserRegistrationService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function saveStep1(array $data): UserRegistration
    {
        $user = new UserRegistration();
        $user->setName($data['name']);
        $user->setBirthdate(new \DateTime($data['birthdate']));

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $user;
    }

    public function saveStep2(int $userId, array $data): void
    {
        $user = $this->findUser($userId);

        if (!$user) {
            throw new EntityNotFoundException('User with ID ' . $userId . ' not found.');
        }

        $user->setStreet($data['street']);
        $user->setNumber($data['number']);
        $user->setZipCode($data['zip_code']);
        $user->setCity($data['city']);
        $user->setState($data['state']);

        $this->entityManager->flush();
    }

    public function saveStep3(int $userId, array $data): void
    {
        $user = $this->findUser($userId);

        if (!$user) {
            throw new EntityNotFoundException('User with ID ' . $userId . ' not found.');
        }

        $user->setPhone($data['phone']);
        $user->setMobile($data['mobile']);

        $this->entityManager->flush();
    }

    public function listUsers(int $page, int $limit): array
    {
        $offset = ($page - 1) * $limit;
        $repository = $this->entityManager->getRepository(UserRegistration::class);

        $users = $repository->findBy([], null, $limit, $offset);
        $total = $repository->count([]);

        return [
            'meta' => [
                'total' => $total,
                'page' => $page,
                'pages' => ceil($total / $limit),
            ],
            'data' => array_map([$this, 'mapUserToArray'], $users),
        ];
    }

    public function findUserDetail(int $userId): ?array
    {
        $user = $this->findUser($userId);

        if (!$user) {
            throw new EntityNotFoundException('User with ID ' . $userId . ' not found.');
        }

        return $this->mapUserToArray($user);
    }

    public function findUser(int $userId): ?UserRegistration
    {
        return $this->entityManager->getRepository(UserRegistration::class)->find($userId);
    }

    private function mapUserToArray(UserRegistration $user): array
    {
        return [
            'id' => $user->getId(),
            'name' => $user->getName(),
            'birthdate' => $user->getBirthdate()?->format('Y-m-d'),
            'street' => $user->getStreet(),
            'number' => $user->getNumber(),
            'zip_code' => $user->getZipCode(),
            'city' => $user->getCity(),
            'state' => $user->getState(),
            'phone' => $user->getPhone(),
            'mobile' => $user->getMobile(),
        ];
    }
}
